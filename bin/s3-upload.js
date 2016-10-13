"use strict";

const fs = require('fs');

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

const logMessage = (data) => {
  console.log(`${filename} is ${data.length} bytes long`);
};

readFile(filename)
.then(logMessage)
.catch(console.error)
;
