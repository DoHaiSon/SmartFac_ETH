const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const IV_LENGTH = 16;
const ENCRYPTION_KEY = process.argv[5].toString();
var id = process.argv[2].toString();
var time = process.argv[3].toString();
var value = process.argv[4].toString();

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

id_enc = encrypt(id);
time_enc = encrypt(time);
value_enc = encrypt(value);

final = id_enc + " " + time_enc + " " + value_enc

return console.log(final)
