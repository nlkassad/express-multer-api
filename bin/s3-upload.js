#!/usr/bin/env node
"use strict";

const fs = require('fs');

// this lets the error say it's not a valid path instead of not a string
// run with npm run s3-upload <filename>
const filename = process.argv[2] || '';

fs.readFile(filename, (error, data) => {
  if (error) {
    return console.error(error);
  }

  console.log(`${filename} is ${data.length} bytes long`);
});
