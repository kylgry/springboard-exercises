const gameContainer = document.getElementById("game");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  let clickedDiv = event.target;

  // do nothing if user clicks on card that is already face up
  if (clickedDiv.classList[1] != null) {
      return 
  }

  // later logic insures zero or one cards can be up at a given time
  // in either case card color should be shown
  clickedDiv.style.backgroundColor = clickedDiv.classList[0];

  // if there were no other cards "up" (excludes matched) then mark as up
  if (document.querySelector(".up") == null) {
      clickedDiv.classList.add("up");
  }

  // otherwise check to see if other up card is same color as the card user just clicked on
  else {
      score++;
      const otherUp = document.querySelector(".up"); 
      if (clickedDiv.classList[0] == otherUp.classList[0]) {
          clickedDiv.classList.add("found");
          otherUp.classList.remove("up");
          otherUp.classList.add("found");
      }
      
      // if they aren't the same then flip them back over
      else {
          otherUp.classList.remove("up");
          
          // need to capture the two elements into new variables in case user clicks
          // faster than one second. then set timeout to turn them back over 
          const flipOne = otherUp;
          const flipTwo = clickedDiv; 
          setTimeout(function (){
            flipOne.style.backgroundColor = "grey";
            flipTwo.style.backgroundColor = "grey";
          },1000);
      }
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);

// start score
// let score = 0;
// const newDiv = document.createElement("div");
// document.body.append(newDiv);



