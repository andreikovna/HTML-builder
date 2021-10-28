const {stdin, stdout} = process;
console.log('what');
stdin.on ('data', data => {
    stdout.write(data);
    process.exit();
})

process.on('exit', () => {stdout.write('goodbye')});