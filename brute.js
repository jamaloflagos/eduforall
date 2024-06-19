const fs = require('fs'); // Import the file system module

const filename = 'brute.txt';

// Create a write stream to the file
const writeStream = fs.createWriteStream(filename);

// Iterate through the combinations
for (let i = 0; i < 1000; i++) {
  const combination = i.toString().padStart(3, '0');
  writeStream.write(combination + '\n'); // Write the combination and a newline
}

// Close the write stream
writeStream.end();
