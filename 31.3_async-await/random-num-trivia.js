
let n = 4;
let randomNums = [];
let randomNumsTrivia = [];

for (let i = 0; i < n; i++) {
  randomNums.push(Math.round(Math.random()*300))
}

async function getRandomNumsTrivia() {
  for (let i = 0; i< n; i++) {
    resp = await axios.get(`http://numbersapi.com/${randomNums[i]}/trivia`, {responseType:'json'})
    document.getElementById('main').innerHTML += '<p>'+resp.data+'</p>'
  }
}

getRandomNumsTrivia()
