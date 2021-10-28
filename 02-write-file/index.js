const path = require('path');
const fs = require('fs');
const {stdin, stdout} = process;

const resultText = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(resultText);

console.log ('\nplease, write smth here:');
stdin.on('data', data => {
    const receivedData = data.toString().trim();
    if (receivedData == 'exit') {
        process.exit();
    } else {
        output.write(data); 
        console.log('\nyou can add smth or write "exit"')
    }  
});

process.on('SIGINT', function () {
    process.exit();
  });
process.on('exit', () => stdout.write('\ngood luck!'));