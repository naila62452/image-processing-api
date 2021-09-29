"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 4000;
app.get('/images', (req, res) => {
    const widthResize = req.query.width;
    const heightResize = req.query.height;
    let width, height, imageHeight, imageWidth;
    width = 0;
    height = 0;
    if (widthResize) {
        width = parseInt(widthResize);
    }
    if (heightResize) {
        height = parseInt(heightResize);
    }
    let path = ('./assets/thumb/' + req.query.filename);
    if (!fs_1.default.existsSync(path)) {
        resizeImage(height, width, req, res);
    }
    else {
        let sizeOf = require('image-size');
        sizeOf(path, function (err, dimensions) {
            imageHeight = dimensions.height;
            imageWidth = dimensions.width;
            if (imageWidth == width && imageHeight == height) {
                fs_1.default.readFile(path, function (err, data) {
                    if (err)
                        throw err;
                    // Fail if the file can't be read.
                    else {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.end(data); // Send the file data to the browser.
                    }
                });
            }
            else {
                resizeImage(height, width, req, res);
            }
        });
    }
});
function resizeImage(height, width, req, res) {
    (0, sharp_1.default)((`./assets/` + req.query.filename))
        .resize({ width: width, height: height })
        .toBuffer()
        .then((data) => {
        res.end(data);
        fs_1.default.writeFile(('./assets/thumb/' + req.query.filename), data, function (err) {
            if (err)
                throw err;
        });
    })
        .catch((err) => {
        console.log(`Something went wrong. ${err}`);
    });
}
app.listen(port, () => {
    console.log(`Listening to the port http://localhost:${port}`);
});
exports.default = app;
