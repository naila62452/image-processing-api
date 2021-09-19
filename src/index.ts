// const myFunc = (num: number): number => {
//   return num * num;
// };
// export default myFunc;

import express from 'express';
import sharp from 'sharp';
const app = express();
const port = 4000;

app.get('/images', (req, res) => {
  const widthResize = req.query.width;
  const heightResize = req.query.height;
  // const imageName: Number = (req.query.filename);
  let width, height;
  if (widthResize) {
    width = Number(widthResize);
  }
  if (heightResize) {
    height = Number(heightResize);
  }
  sharp('image-processing-api/images/assets' + req.query.filename)
    .resize({ width: width, height: height })
    .toBuffer()
    .then((data) => {
      res.end(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Listening to the port http://localhost:${port}`);
});
