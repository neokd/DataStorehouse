import string
import random
import time

def generate_password(length):
    password = ''
    for _ in range(length):
        password += random.choice(string.digits)
    return password

if __name__ == '__main__':
    start = time.time()
    with open('4_digit_pin.txt','w') as f:
        for i in range(10000):
            f.write(generate_password(4)+'\n')
    end = time.time()
    print('Time used: {} sec'.format(end-start))
    