const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const template = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, err => {
    if (err) {
        throw err;
      }
  });

  const indexHtml = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));

  template.pipe(indexHtml);

  const htmlResult = path.join(__dirname, 'project-dist', 'index.html');

  fs.readFile(htmlResult, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    data = data.toString();
    console.log(data)

    const regularTags = data.match(/{{(.*)}}/gi);
    console.log(regularTags)

    for (let i=0; i<regularTags.length; i++) {
      const tagFile = regularTags[i].match(/\w+/);
      const tagNameFile = tagFile[0]
      
      const component = fs.createReadStream(path.join(__dirname, 'components', `${tagNameFile}.html`), 'utf-8');
      const 
      data = data.replace(regularTags[i], component.toString())
      console.log(data)
    }
    
  });

const resultStyles = path.join(__dirname, 'project-dist', 'style.css');
const sourseStyles = path.join(__dirname, 'styles')
const outputStyles = fs.createWriteStream(resultStyles);

fs.readdir(sourseStyles, {withFileTypes: true}, (err, files) => {
    if (err) {
        console.log(err);
    }  else {
        files.forEach(file => {
            if (file.isFile()) {
                const fileName = file.name.toString();
                const extName = file.name.toString().split('.')[1];
                if (extName == 'css') {

                    fs.readFile(
                        path.join(__dirname, 'styles', fileName),
                        'utf-8',
                        (err, data) => {
                            if (err) throw err;
                            const mergedStyles = [];
                            const style = data.toString();
                            mergedStyles.push(style);

                            for (let i=0; i<mergedStyles.length; i++){
                                outputStyles.write(mergedStyles[i]);
                            }
                        }
                    );   
                }
            } 
        })
    }
})

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, err => {
    if (err) {
        throw err;
      }
  });





