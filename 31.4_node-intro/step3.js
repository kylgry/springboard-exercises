const axios = require('axios');
const fs = require('fs');
let path;
let fileOut;

function cat(filePath, fileOut) {
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if (fileOut) {
      writeFile(data);
    }
    else {
      console.log(data);
    }
  })
}

function webCat(url, fileOut) {
  axios.get(url).then(function(resp) {
      if (fileOut) {
        writeFile(resp.data);
      }
      else {
        console.log(resp.data);
      }
  })
}

function writeFile(data) {
  fs.writeFile(fileOut, data, 'utf8', function(err){
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Contents of ${path} written to ${fileOut}.`)
  });
}

if (process.argv[2] == '--out') {
  fileOut = process.argv[3];
  path = process.argv[4];
}
else {
  fileOut = null;
  path = process.argv[2];
}

if (path.slice(0,4) == 'http') {
  webCat(path, fileOut);
}
else {
  cat(path, fileOut)
}
