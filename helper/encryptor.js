//Checking the crypto module
const crypto = require('crypto');

const ENCRYPTION_KEY = '32165498732165498732165498732132'; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

//Encrypting text
function encrypt(text) {
   let iv = crypto.randomBytes(IV_LENGTH);
   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
   let encrypted = cipher.update(text);
  
   encrypted = Buffer.concat([encrypted, cipher.final()]);
  
   return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypting text
function decrypt(text) {
   let textParts = text.split(':');
   let iv = Buffer.from(textParts.shift(), 'hex');
   let encryptedText = Buffer.from(textParts.join(':'), 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
   let decrypted = decipher.update(encryptedText);
  
   decrypted = Buffer.concat([decrypted, decipher.final()]);
  
   return decrypted.toString();
}

// add the code below
module.exports = { encrypt,  decrypt};