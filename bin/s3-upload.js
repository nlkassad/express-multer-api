"use strict";

// this has to come before anything else
// we are not evaluating for return value, we are pulling in the return method
require('dotenv').config();

const fs = require('fs');
const fileType = require('file-type');
const AWS = require('aws-sdk');

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

// instance of s3 manager constructor function
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const upload = (file) => {
  const options = {
    // get bucket name from aws
    Bucket: 'nsm-datastore-01',
    // attach the fileBuffer as a stream to send to s3
    Body: file.data,
    // allow anyone to access the url of the uploaded file
    ACL: 'public-read',
    // tell amazon what the mime type is
    ContentType: file.mime,
    // pick a fileype for s3 to use for upload
    Key: `test/test.${file.ext}`
  };
  // only passing data down promise chain
  return new Promise((resolve, reject) => {
    s3.upload(options, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });
};

const logMessage = (response) => {
  console.log(`the response from AWS was ${JSON.stringify(response)}`);
};

readFile(filename)
.then(parseFile)
.then(upload)
.then(logMessage)
.catch(console.error)
;
