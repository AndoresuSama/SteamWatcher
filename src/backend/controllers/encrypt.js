const crypto = require('crypto');

/**
 * Función que realiza la encriptación de un texto
 */
function encrypt(text) {
  const algorithm = 'aes-256-cbc';
  const password = process.env.MOCK_KEY || '_password';

  const key = crypto.createHash('sha256').update(password).digest();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

module.exports = {
  encrypt
}