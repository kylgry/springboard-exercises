// Object 1: 8, 1846
// Object 2: { yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659 }
// Object 3: 'Your name is Alejandro and you like purple'
// Object 3: 'Your name is Melissa and you like green'
// Object 3: Your name is undefined and you like green'
// Array 1: Maya, Marisa, Chi
// Array 2: "Raindrops on roses", "whiskers on kittens",
// Array 2: [ "Bright copper kettles", "warm woolen mittens", "Brown paper packages tied up with strings" ]
// Array 3: [10, 30, 20]


var obj = { numbers: { a: 1, b: 2 }};
const { numbers: {a, b} } = obj;
console.log(a,b)

var arr = [1, 2];
[ arr[1], arr[0] ] = [ arr[0], arr[1] ];
console.log(arr);

const raceResults = ([first, second, third, ...rest]) => ({ first, second, third, rest })
console.log(raceResults(['Tom', 'Margaret', 'Allison', 'David', 'Pierre']))
