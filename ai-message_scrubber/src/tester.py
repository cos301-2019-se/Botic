names = ['Peter','Kyle','Lesego','Alicia','Justin']

sentence = "I have Alicia osteoperosis "

for x in names:
    if sentence.find(x)  == -1:
        print("We ain't found shiiiiit")
    else:
        print(names.index(x))
        str = sentence.split(' ')
        for y in str:
            if x == y:
                print(str.index(y))
        print(str)

def checkNames
