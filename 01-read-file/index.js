const path = require('path');
const fs = require('fs');
const {stdout} = process;

const resultText = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(resultText, 'utf-8');

readStream.on ('data', chunk => stdout.write(chunk));





