const fs = require("fs");
const axios = require("axios");
const markov = require("./markov");

const fileOut = 'markov.txt';

if (process.argv[2] == 'file') {
  fs.readFile(process.argv[3], 'utf8', function(err, data) {
    if (err) {
      console.log('Error reading from file.')
      console.error(err);
      process.exit(1);
    }
    let mm = new markov.MarkovMachine(data);
    mm.makeText();
    console.log(mm.text);
  })
}

else if (process.argv[2] == 'url') {
  axios.get(process.argv[3]).then(function(resp) {
    let mm = new markov.MarkovMachine(resp.data);
    mm.makeText();
    console.log(mm.text);
  })
}

else {
  console.log('First argument must be "file" or "url".')
  process.exit(1);
}
