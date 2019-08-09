import gensim
import pandas as pd
import numpy as np
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt


def arrayFromFile(filename):
    text_file = open(filename, "r")
    lines = text_file.read().split('\r\n')
    text_file.close()
    return lines

dataset = arrayFromFile("dataset.txt")

# show the example of list of list format of the custom corpus for gensim modeling
#print(sent[:2])
#for s in dataset:
#    print(s)
model = gensim.models.Word2Vec([s.split(' ') for s in dataset], min_count=5, size= 182,workers=5, window =11, iter=1000)
model.save("model.word2vec");
#model = gensim.models.Word2Vec([s for s in dataset], min_count=5, size= 182,workers=5, window =5)
#print(model['password'])

print('Models')
print('=========')
print(model.predict_output_word(['my', 'name', 'is', 'and', 'password'], topn=5))
#print(model.most_similar('name')[:5])
print(len(model.wv.vocab))

def display_closestwords_tsnescatterplot(model, word, size):
    arr = np.empty((0,size), dtype='f')
    word_labels = [word]

    close_words = model.similar_by_word(word)

    arr = np.append(arr, np.array([model[word]]), axis=0)

    for wrd_score in close_words:
        wrd_vector = model[wrd_score[0]]
        word_labels.append(wrd_score[0])
        arr = np.append(arr, np.array([wrd_vector]), axis=0)

    tsne = TSNE(n_components=2, random_state=0)
    np.set_printoptions(suppress=True)
    Y = tsne.fit_transform(arr)
    x_coords = Y[:, 0]
    y_coords = Y[:, 1]
    plt.scatter(x_coords, y_coords)

    for label, x, y in zip(word_labels, x_coords, y_coords):
        plt.annotate(label, xy=(x, y), xytext=(0, 0), textcoords='offset points')
        plt.xlim(x_coords.min()+0.00005, x_coords.max()+0.00005)
        plt.ylim(y_coords.min()+0.00005, y_coords.max()+0.00005)

    plt.show()

# display_closestwords_tsnescatterplot(model, 'password', 182)
