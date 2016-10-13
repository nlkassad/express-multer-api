"use strict";

const fs = require('fs');
const fileType = require('file-type');

// this lets the error say it's not a valid path instead of not a string
// run with npm run s3-upload <filename>
const filename = process.argv[2] || '';

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

// return default object if fileType is given and unsupported file type
const mimeType = (data) => {
  return Object.assign({
    ext: 'bin',
    mime: 'application/octet-stream',
  }, fileType(data));
};

const parseFile = (fileBuffer) => {
  let file = mimeType(fileBuffer);
  file.data = fileBuffer;
  return file;
};

const logMessage = (file) => {
  console.log(`${filename} is ${file.data.length} bytes long and is of type ${file.mime}`);
};

readFile(filename)
.then(parseFile)
.then(logMessage)
.catch(console.error)
;
