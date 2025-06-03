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

  // Se incluye el IV al inicio, separado por ':'
  return iv.toString('hex') + ':' + encrypted;
}

/*
 * Función que desencripta el texto anterior
 */
function decrypt(encryptedText) {
  const algorithm = 'aes-256-cbc';
  const password = process.env.MOCK_KEY || '_password';

  const key = crypto.createHash('sha256').update(password).digest();

  // Separar IV y texto cifrado
  const [ivHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

module.exports = {
  encrypt,
  decrypt
};
