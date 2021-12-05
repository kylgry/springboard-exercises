function randomGame() {

    let tries = 0;

    function randomNumber() {
        tries++;
        if ( Math.random() >= 0.75 ) { 
            clearInterval(int1);
            console.log(tries);
        }
    }

    let int1 = setInterval(randomNumber, 1000);

}

randomGame();
