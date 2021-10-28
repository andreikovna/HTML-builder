const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, 'secret-folder');
console.log (folder)

fs.readdir(folder,  { withFileTypes: true }, (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("\nCurrent directory filenames:\n");

      files.forEach(file => {

          if (file.isFile()) {
            const fileName = file.name.toString().split('.')[0];
            const extName = file.name.toString().split('.')[1];
            const filePath = path.join(__dirname, 'secret-folder', file.name)
            fs.stat(filePath, (error, stats) => {
                if (error) {
                  console.log(error);
                }
                else {
                  const fileSize = stats.size*0.001;
                  console.log(`${fileName} - ${extName} - ${fileSize}kb`);
                }
              });
            
            
          }
        
      })
    }
  })