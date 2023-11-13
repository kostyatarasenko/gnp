import os
import getpass
from cryptography.fernet import Fernet

def generate_password(length=12):
    import string
    import random
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for _ in range(length))
    return password

def save_encrypted_password(password, name):
    key = Fernet.generate_key()
    cipher_suite = Fernet(key)
    encrypted_password = cipher_suite.encrypt(password.encode())

    root_path = '/'
    file_name = "{}_password.txt".format(name)
    file_path = os.path.join(root_path, file_name)

    with open(file_path, 'wb') as file:
        file.write(encrypted_password)

    return file_path

if __name__ == "__main__":
    name = raw_input("Type a name of password: ")
    password = generate_password()
    file_path = save_encrypted_password(password, name)

    print("{} : {} saved in {}".format(name, password, file_path))
