function guessingGame() {
  let num = Math.random()*100
  let count = 0
  let won = false
  return function game(guess) {
    if (won) { return "The game is over, you already won!" }
    if (guess == num) {
      won = true
      count++
      return "You win! You found 60 in "+count+" guesses."
    }
    if (guess < num) {
      count++
      return guess+" is too low!"
    }
    if (guess > num) {
      count++
      return guess+" is too high!"
    }
  }
}

module.exports = { guessingGame };
