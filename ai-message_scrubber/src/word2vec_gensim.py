import gensim

import pandas as pd

df = pd.read_csv('data.csv')
df.head()

df['Maker_Model']= df['Make']+ " " + df['Model']

# Select features from original dataset to form a new dataframe
df1 = df[['Engine Fuel Type','Transmission Type','Driven_Wheels','Market Category','Vehicle Size', 'Vehicle Style', 'Maker_Model']]

# For each row, combine all the columns into one column
df2 = df1.apply(lambda x: ','.join(x.astype(str)), axis=1)

# Store them in a pandas dataframe
df_clean = pd.DataFrame({'clean': df2})

# Create the list of list format of the custom corpus for gensim modeling
sent = [row.split(',') for row in df_clean['clean']]

# show the example of list of list format of the custom corpus for gensim modeling
print(sent[:2])

model = gensim.models.Word2Vec(sent, min_count=1, size= 182,workers=3, window =3, sg = 1)

print(model['Toyota Camry'])

print('Models')
print('=========')

print(model.predict_output_word(['MANUAL','rear wheel drive'], topn=5))
