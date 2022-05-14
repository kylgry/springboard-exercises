
let n = 4;
let randomNums = [];
let randomNumsTriviaPromises = [];

for (let i = 0; i < n; i++) { randomNums.push(Math.round(Math.random()*300)) }

for (let i = 0; i < n; i++) {
  randomNumsTriviaPromises.push(axios.get(`http://numbersapi.com/${randomNums[i]}/trivia`, {responseType:'json'}));
}

Promise.all(randomNumsTriviaPromises).then(randomNumsTrivia => randomNumsTrivia.forEach(p => document.querySelector('body').innerHTML += '<p>'+p.data+'</p>'));

document.querySelector('body').append('')
