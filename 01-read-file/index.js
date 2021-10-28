// const { stdin, stdout, exit} = process;
// const flag = process.argv[2];
// const allowedFlags = ['-f', '-d'];
// if (!allowedFlags.includes(flag)) {
//     stdout.write('Попробуйте ещё раз запустить файл с флагом -f или -d');
//     exit();
// }
// if (flag == '-d') {
//     console.log(__dirname);
// }
// if (flag == '-f'){
//     console.log(__filename);
// }

const path = require('path');
const fs = require('fs');
const {stdout} = process;

const resultText = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(resultText, 'utf-8');

readStream.on ('data', chunk => stdout.write(chunk));





