import string
import random
import time

def generate_password(length):
    password = ''
    for _ in range(length):
        password += random.choice(string.ascii_letters + string.digits)
    return password

if __name__ == '__main__':
    start = time.time()
    with open('keyboard_combination.txt','w') as f:
        for i in range(10000000):
            f.write(generate_password(8)+'\n')

    end = time.time()
    print('Took {} seconds to generate 1 million passwords'.format(end-start))
    