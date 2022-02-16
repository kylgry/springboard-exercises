
score = 0;
successfulWords = [];
timeLeft = 60;

const eScore = document.querySelector('#score span');
const eTimer = document.querySelector('#timer span');
const eForm = document.getElementById('guess');
const eInput = document.querySelector('#guess input');
const eResponse = document.getElementById('response');

async function sendGuess(guess) {

  const result = await axios.get(`/guess?word=${guess}`);
  const msg = result.data.result;

  if (msg == 'ok') {
    score += guess.length;
    successfulWords.push(guess);
    eResponse.innerHTML = "nice!";
    eScore.innerHTML = score;
  }

  else if (msg == 'not-word') {
    eResponse.innerHTML = "that isn't a word";
  }

  else if (msg == 'not-on-board') {
    eResponse.innerHTML = "that word isn't on the board"
  }

  setTimeout(() => eResponse.innerHTML = "", 2000);

}

function countDown() {

  if (timeLeft > 0) {
    timeLeft += -1;
    eTimer.innerHTML = timeLeft;
  }

  else {
    clearInterval(timer);
    eForm.remove();
    eResponse.innerHTML = 'game over';
    sendScore();
  }

}

async function sendScore() {
  await axios.post('/newscore', {score: score});
}

eForm.addEventListener('submit', function (e) {


  const word = eInput.value.toLowerCase();
  e.preventDefault();

  if (!successfulWords.includes(word)) {
    sendGuess(word);
  }
  else {
    eResponse.innerHTML = "you already used that word";
    setTimeout(() => eResponse.innerHTML = "", 2000);
  }

  eInput.value = '';

})

eTimer.innerHTML = timeLeft;
const timer = setInterval(countDown, 1000)
