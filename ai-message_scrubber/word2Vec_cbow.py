
import string, re, os
import collections
import random
import datetime, time

import numpy as np
from tensorflow.python.framework import ops
import tensorflow as tf

tf.logging.set_verbosity(tf.logging.ERROR)
start_time = time.time()
print('Start Time: ', datetime.datetime.today())

file1 = 'A Tale of Two Cities - Charles Dickens.txt'
file2 = 'The picture of Dorian Gray - Oscar Wilde.txt'

f = open(file1, encoding='utf-8')

#Declare punctuation
punctuation = string.punctuation
punctuation = ''.join([x for x in punctuation if x not in ['-', "-"]])

#FORMAT TEXT
book_text = f.read()
book_text = book_text.replace('\r\n', '')
book_text = book_text.replace('\n', '')
book_text = re.sub(r'[{}]'.format(punctuation), ' ', book_text)
book_text = re.sub('\s+', ' ', book_text).strip().lower()

#BUILD VOCABULARY
def build_vocab(text, min_word_freq):
	word_counts = collections.Counter(text.split(' '))
	print('Word Counts: ', len(word_counts), 'Text Length: ', len(text.split(' ')))
	#More frequent words
	words = word_counts.keys()
	vocab_to_ix_dict = {key: (ix + 1) for ix, key in enumerate(words)}
	vocab_to_ix_dict['unknown'] = 0 #When a word is unknown
	ix_to_vocab_dict = {val: key for key, val in vocab_to_ix_dict.items()}
	return(ix_to_vocab_dict, vocab_to_ix_dict)

min_word_freq = 5 #Trim words that occur less than 5 times
ix2vocab, vocab2ix = build_vocab(book_text, min_word_freq)
vocab_size = len(ix2vocab) + 1
print('Vocabulary Length = {}'.format(vocab_size))
assert(len(ix2vocab) == len(vocab2ix)) ### POSSIBLE TEST

#TEXT TO WORD VECTOR
book_text_words = book_text.split(' ')
book_text_ix = []
for ix, x in enumerate(book_text_words):
	try:
		book_text_ix.append(vocab2ix[x])
	except:
		book_text_ix.append(0)
book_text_ix = np.array(book_text_ix)

#LONG-SHORT TERM MEMORY MODEL
class LSTM_Model():
	def __init__(self, rnn_size, batch_size, learning_rate, training_seq_len, vocab_size, infer_sample=False):
		self.rnn_size = rnn_size
		self.vocab_size = vocab_size
		self.infer_sample = infer_sample
		self.learning_rate = learning_rate

		if infer_sample:
			self.batch_size = 1
			self.training_seq_len = 1
		else:
			self.batch_size = batch_size
			self.training_seq_len = training_seq_len

		#Long-Short term memory cell initialiser
		self.lstm_cell = tf.contrib.rnn.BasicLSTMCell(rnn_size)
		#Initial state is zeroed of length float32
		self.initial_state = self.lstm_cell.zero_state(self.batch_size, tf.float32)

		self.x_data = tf.placeholder(tf.int32, [self.batch_size, self.training_seq_len])
		self.y_output = tf.placeholder(tf.int32, [self.batch_size, self.training_seq_len])

		#initialize using softmax
		with tf.variable_scope('lstm_vars'):
			#Weight initialzed over normal distribution
			W = tf.get_variable('W', [self.rnn_size, self.vocab_size], tf.float32, tf.random_normal_initializer())
			#Bias initialized to all zero
			b = tf.get_variable('b', [self.vocab_size], tf.float32, tf.constant_initializer(0.0))
			
			#embedding defenitions initialized over the normal distribution
			embedding_mat = tf.get_variable('embedding_mat', [self.vocab_size, self.rnn_size], tf.float32, tf.random_normal_initializer())

			#print tests
			#print shape to ensure right dimensions
			print('x_data: ', self.x_data.get_shape())
			print('emb_mat: ', embedding_mat.get_shape())
			embedding_output = tf.nn.embedding_lookup(embedding_mat, self.x_data)
			print('emb_output: ', embedding_output.get_shape())
			rnn_inputs = tf.split(axis=1, num_or_size_splits=self.training_seq_len, value=embedding_output)

			print('rnn_inputs: ', len(rnn_inputs), rnn_inputs[0].get_shape())
			rnn_inputs_trimmed = [tf.squeeze(x, [1]) for x in rnn_inputs]
			print('rnn_inputs_trimmed: ', len(rnn_inputs_trimmed), rnn_inputs_trimmed[0].get_shape())

			###############
			# PREDICTIONS #
			###############

			#Infering text
			def inferred_loop(prev, count):
				#transformed = (previous hidden_layer * Weight) + Bias
				prev_transformed = tf.matmul(prev, W) + b
				#Index of output word
				#Stop gradient descent since we aernt learning here
				#RELU determination
				prev_symbol = tf.stop_gradient(tf.argmax(prev_transformed, 1))
				#Get new vector
				output = tf.nn.embedding_lookup(embedding_mat, prev_symbol)
				return output

			decoder = tf.contrib.legacy_seq2seq.rnn_decoder
			outputs, last_state = decoder(rnn_inputs_trimmed, self.initial_state, self.lstm_cell, 
											loop_function=inferred_loop if infer_sample else None)
			
			#Non infered
			output = tf.reshape(tf.concat(axis=1, values = outputs), [-1, self.rnn_size])
			self.logit_output = tf.matmul(output, W) + b
			self.model_output = tf.nn.softmax(self.logit_output)

			#Calculate Loss
			loss_fun = tf.contrib.legacy_seq2seq.sequence_loss_by_example
			loss = loss_fun([self.logit_output], [tf.reshape(self.y_output, [-1])],
							[tf.ones([self.batch_size * self.training_seq_len])],
							self.vocab_size)

			#Calculate Cost
			self.cost = tf.reduce_sum(loss) / (self.batch_size * self.training_seq_len)
			self.final_state = last_state
			gradients, _ = tf.clip_by_global_norm(tf.gradients(self.cost, tf.trainable_variables()), 4.5)
			optimizer = tf.train.AdamOptimizer(self.learning_rate)
			self.train_op = optimizer.apply_gradients(zip(gradients, tf.trainable_variables()))

	def sample(self, session, words=ix2vocab, vocab=vocab2ix, num=10, prime_text='thou art'):
		state = session.run(self.lstm_cell.zero_state(1, tf.float32))
		word_list = prime_text.split()
		for word in word_list[:-1]:
			x = np.zeros((1, 1))
			x[0, 0] = vocab[word]
			feed_dict = {self.x_data: x, self.initial_state: state}
			[state] = session.run([self.final_state], feed_dict=feed_dict)

		out_sentence = prime_text + " - Possibilities: \n"
		word = word_list[-1]
		for n in range(num):
			x = np.zeros((1, 1))
			x[0, 0] = vocab[word]
			feed_dict = {self.x_data: x, self.initial_state: state}
			[model_output, state] = session.run([self.model_output, self.final_state], feed_dict=feed_dict)
			# sample = np.argmax(model_output[0])
			topMatches = largest_indices(model_output[0], 10)
			# print(topMatches[0][0])
			for i in topMatches[0]:
				# print(i)
				out_sentence = out_sentence + words[i] + " (" + str(model_output[0][i] * 100)[:5] + "%)\n"
			# if sample == 0:
			# 	break
			# word = words[sample]
			# out_sentence = out_sentence + ' ' + word
		return(out_sentence)

	######################
	# END OF PREDICTIONS #
	######################

############################
# Editable variables below #
############################

rnn_size = 1024 #rnn model size
epochs = 1
batch_size = 32
learning_rate = 0.001
training_seq_len = 11 #How long of a word group to consider
eval_every = 50 #How often to evaluate test sentences
prime_texts = ['a broken country', 'when they were', 'and so the king', 'my name is']
prediction_length = 1

##########################
# Editable variables end #
##########################

embedding_size = rnn_size
session = tf.Session()

with tf.variable_scope('lstm_model') as scope:
	lstm_model = LSTM_Model(rnn_size, batch_size, learning_rate, training_seq_len, vocab_size)
	scope.reuse_variables()
	test_lstm_model = LSTM_Model(rnn_size, batch_size, learning_rate, training_seq_len, vocab_size, infer_sample=True)

def largest_indices(ary, n):
	flat = ary.flatten()
	indices = np.argpartition(flat, -n)[-n:]
	indices = indices[np.argsort(-flat[indices])]
	return np.unravel_index(indices, ary.shape)

######################
# TRAINING THE MODEL #
######################
def train():
	num_batches = int(len(book_text_ix) / (batch_size * training_seq_len)) + 1
	batches = np.array_split(book_text_ix, num_batches)
	batches = [np.resize(x, [batch_size, training_seq_len]) for x in batches]

	init = tf.global_variables_initializer()
	session.run(init)

	#BEGIN learning  :D
	train_loss = []
	iteration_count = 1
	for epoch in range(epochs):
		random.shuffle(batches)
		targets = [np.roll(x, -1, axis=1) for x in batches]
		print()
		print('Starting Epoch #{} of {}.'.format(epoch + 1, epochs))
		#Reset model after each epoch
		state = session.run(lstm_model.initial_state)
		for ix, batch in enumerate(batches):
			training_dict = {lstm_model.x_data: batch, lstm_model.y_output: targets[ix]}
			c, h = lstm_model.initial_state
			training_dict[c] = state.c
			training_dict[h] = state.h
			temp_loss, state, _ = session.run([lstm_model.cost, lstm_model.final_state, lstm_model.train_op],
												feed_dict=training_dict)
			train_loss.append(temp_loss)

			if iteration_count % 10 == 0:
				summary_nums = (iteration_count, epoch + 1, ix + 1, num_batches + 1, temp_loss)
				print('Iteration: {}, Epoch: {}, Batch: {} out of {}, Loss: {:.2f}'.format(*summary_nums), ', Elapsed Time: ', (time.time() - start_time), ' seconds')

			if iteration_count % eval_every == 0:
				print()
				for sample in prime_texts:
					print(test_lstm_model.sample(session, ix2vocab, vocab2ix, num=prediction_length, prime_text=sample))
				print()
			iteration_count += 1
		
		#Save the model
		#Model name = lstm_model
		#session name = session
		#input = x_input
		#output = y_output
		saver = tf.train.Saver()

		save_path = saver.save(session, "twoCities.ckpt")
		print("Model saved in path: %s" % save_path)

def load():
	saver = tf.train.Saver()
	saver.restore(session, "twoCities.ckpt")
	print("Model restored.")
	print()
	for sample in prime_texts:
		print(test_lstm_model.sample(session, ix2vocab, vocab2ix, num=prediction_length, prime_text=sample))
	print()

train()