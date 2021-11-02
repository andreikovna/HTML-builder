const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
})

const template = fs.createReadStream(
  path.join(__dirname, "template.html"),
  "utf-8"
);
const indexHtml = fs.createWriteStream(
    path.join(__dirname, "project-dist", "index.html")
  );

template.on('data', async (data) => {
  const htmlResult = await htmlBuild();
  indexHtml.write(htmlResult);

  async function htmlBuild() {
    let html = data.toString();
    const regularTags = html.match(/{{(.*)}}/gi);

    for (let item of regularTags) {
      const tagFile =item.match(/\w+/);
      const tagNameFile = tagFile[0];

      const component = await fsPromises.readFile(path.join(__dirname, 'components', `${tagNameFile}.html`));
      html = html.replace(item, component.toString());
    };
    return html; 
  } 
})


const resultStyles = path.join(__dirname, "project-dist", "style.css");
const sourseStyles = path.join(__dirname, "styles");
const outputStyles = fs.createWriteStream(resultStyles);

fs.readdir(sourseStyles, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (file.isFile()) {
        const fileName = file.name.toString();
        const extName = file.name.toString().split(".")[1];
        if (extName == "css") {
          fs.readFile(
            path.join(__dirname, "styles", fileName),
            "utf-8",
            (err, data) => {
              if (err) throw err;
              const mergedStyles = [];
              const style = data.toString();
              mergedStyles.push(style);

              for (let i = 0; i < mergedStyles.length; i++) {
                outputStyles.write(mergedStyles[i]);
              }
            }
          );
        }
      }
    });
  }
});

// fs.mkdir(
//   path.join(__dirname, "project-dist", "assets"),
//   { recursive: true },
//   (err) => {
//     if (err) {
//       throw err;
//     }
//   }
// );
