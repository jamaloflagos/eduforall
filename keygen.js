const crypto = require('crypto');

// Generate a 32-byte (256-bit) key
const key = crypto.randomBytes(32);

// Convert to Base64 string for easier storage
const base64Key = key.toString('hex');

console.log('Base64 Key:', base64Key);