const fs = require('fs')
const crypto = require('crypto')
const readline = require('readline')

function generatePassword(length = 12) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|:,.<>?'
  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    password += characters[randomIndex]
  }
  return password
}

function saveEncryptedPassword(password, name) {
  const key = crypto.randomBytes(32)
  const cipher = crypto.createCipher('aes-256-cbc', key)

  const encryptedPassword = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()])

  const rootPath = require('os').homedir()
  const fileName = `${name}_password.txt`
  const filePath = require('path').join(rootPath, fileName)

  fs.writeFileSync(filePath, encryptedPassword)

  return filePath
}

function readEncryptedPassword(name) {
  const rootPath = require('os').homedir()
  const fileName = `${name}_password.txt`
  const filePath = require('path').join(rootPath, fileName)

  if (!fs.existsSync(filePath)) {
    return 'Password not found'
  }

  const encryptedPassword = fs.readFileSync(filePath)
  const key = crypto.randomBytes(32)
  const decipher = crypto.createDecipher('aes-256-cbc', key)

  const decryptedPassword = Buffer.concat([decipher.update(encryptedPassword), decipher.final()])

  return decryptedPassword.toString('utf8')
}

const args = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (args[0]) {
  const name = args[0];
  if (args[1] === '--read') {
    const password = readEncryptedPassword(name);
    console.log(`${name} : ${password}`);
  } else {
    const password = generatePassword();
    const file_path = saveEncryptedPassword(password, name);
    console.log(`${name} : ${password} saved in ${file_path}`);
  }
} else {
  rl.question('Enter a name for the password: ', (name) => {
    rl.close();
    if (name) {
      const password = generatePassword();
      const file_path = saveEncryptedPassword(password, name);
      console.log(`${name} : ${password} saved in ${file_path}`);
    } else {
      console.log('Invalid name. Please provide a name for the password.');
    }
  });
}
