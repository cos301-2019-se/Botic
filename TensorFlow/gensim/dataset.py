def arrayFromFile(filename):
    text_file = open(filename, "r")
    lines = text_file.read().split('\n', 2)
    text_file.close()
    return lines

data = arrayFromFile("dataset.tx")

for x in data:
    y = x.split("__")

    for num in y:
        if y.index(num) % 4 ==0:
            print num
            print(" ")
    #for num in y:
    # if y.index(num) == 1:
    #    print (num)
