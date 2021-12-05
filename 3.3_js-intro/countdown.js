function countdown(num) {

    let i = num-1;

    function decrement() {
        console.log(i);
        if ( i == 1 ) { 
            clearInterval(int1);
            console.log("DONE!");
        };
        i--;
    }

    let int1 = setInterval(decrement, 1000);

}

countdown(5);
