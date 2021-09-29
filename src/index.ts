import express from 'express';
import sharp from 'sharp';
import fs from 'fs';

const app = express();
const port = 4000;

app.get('/images', (req, res) => {
  const widthResize = req.query.width;
  const heightResize = req.query.height;
  let width: number, height: number, imageHeight: number, imageWidth: number;
  width = 0;
  height = 0;
  if (widthResize) {
    width = parseInt(widthResize as string);
  }
  if (heightResize) {
    height = parseInt(heightResize as string);
  }
  let path = ('./assets/thumb/' + req.query.filename) as string;
  if (!fs.existsSync(path)) {
    resizeImage(height, width, req, res);
  } else {
    let sizeOf = require('image-size');
    sizeOf(
      path,
      function (err: string, dimensions: { height: number; width: number }) {
        imageHeight = dimensions.height;
        imageWidth = dimensions.width;
        if (imageWidth == width && imageHeight == height) {
          fs.readFile(path, function (err, data) {
            if (err) throw err;
            // Fail if the file can't be read.
            else {
              res.writeHead(200, { 'Content-Type': 'image/jpeg' });
              res.end(data); // Send the file data to the browser.
            }
          });
        } else {
          resizeImage(height, width, req, res);
        }
      }
    );
  }
});
function resizeImage(height: number, width: number, req: any, res: any) {
  sharp((`./assets/` + req.query.filename) as string)
    .resize({ width: width, height: height })
    .toBuffer()
    .then((data) => {
      res.end(data);
      fs.writeFile(
        ('./assets/thumb/' + req.query.filename) as string,
        data,
        function (err) {
          if (err) throw err;
        }
      );
    })
    .catch((err: string) => {
      console.log(`Something went wrong. ${err}`);
    });
}
app.listen(port, () => {
  console.log(`Listening to the port http://localhost:${port}`);
});
export default app;