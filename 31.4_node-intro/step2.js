const axios = require('axios');
const fs = require('fs');

function cat(filePath) {
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(data);
  })
}

function webCat(url) {
  axios.get(url).then(function(resp) {
    console.log(resp.data);
  })
}

const path = process.argv[2];

if (path.slice(0,4) == 'http') {
  webCat(path);
}

else {
  cat(path)
}
