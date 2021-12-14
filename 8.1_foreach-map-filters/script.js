
const numbers = [40,243,43,1,45,8];
const strings = ['colt','matt','tim','test'];
const object = [{name: 'Elie'},{name: 'Tim'},{name: 'Matt'},{name: 'Colt'}];
const text = 'Rainbows And Waterfalls';
const fullnames= [
  {first: 'Elie', last:"Schoppik"},
  {first: 'Tim', last:"Garcia", isCatOwner: true},
  {first: 'Matt', last:"Lane"},
  {first: 'Colt', last:"Steele", isCatOwner: true}
];

function doubleValues(array) {
  let newarray = []
  array.forEach(function(val){
    newarray.push(val*2);
  })
  return newarray;
}

function onlyEvenValues(array) {
  let newarray = []
  array.forEach(function(val){
    if (val%2 == 0) {
      newarray.push(val);
    }
  })
  return newarray;
};

function showFirstAndLast(array) {
  let newarray = [];
  array.forEach(function(val){
    newarray.push(val[0]+val[val.length-1]);
  })
  return newarray;
}

function showKeyAndValue(objectArray,newKey,newValue) {
  let newObjectArray = [];
  objectArray.forEach(function(value){
    value[newKey] = newValue;
    newObjectArray.push({value});
  })
  return newObjectArray;
}

function vowelCount(string) {
  let vowelCount = {a:0,e:0,i:0,o:0,u:0};
  [...string].forEach(function(val){
    const char = val.toLowerCase();
    if (char == 'e') {vowelCount.e += 1};
    if (char == 'a') {vowelCount.a += 1};
    if (char == 'i') {vowelCount.i += 1};
    if (char == 'o') {vowelCount.o += 1};
    if (char == 'u') {vowelCount.u += 1};
  })
  return vowelCount;
}

function doubleValuesWithMap(array){
  return array.map(function(value){
    return value*2;
  })
}

function valTimesIndex(array){
  return array.map(function(value,i){
    return value*i;
  })
}

function extractKey(object,key){
  return object.map(function(value){
      return value[key];
  })
}

function extractFullName(object){
  return object.map(function(value){
    return value.first + " " + value.last;
  })
}

function filterByValue(object,key){
  return object.filter(function(value){
    return value[key] != null;
  })
}

function find(array,value){
  return array.filter(function(v){
    return v == value;
  })[0]
}

function findInObj(object,key){
  return object.filter(function(v){
    return v[key] != null
  })[0]
}

function removeVowels(string){
  vowels = [...'aeiou'];
  return [...string.toLowerCase()].filter(function(v){
    return !vowels.includes(v);
  }).join('')
}

function doubleOddNumbers(array){
  const odds = array.filter(function(v){
    return v%2 != 0;
  })
  return odds.map(function(v){
    return v*2;
  });
}

console.log("numbers: "+numbers);
console.log(doubleValues(numbers));
console.log(onlyEvenValues(numbers));
console.log(showFirstAndLast(strings));
console.log(object);
console.log(showKeyAndValue(object,'title','instructor'));
console.log(vowelCount(text));
console.log(doubleValuesWithMap(numbers));
console.log(valTimesIndex(numbers));
console.log(extractKey(object,'name'));
console.log(extractFullName(fullnames));
console.log(filterByValue(fullnames,'isCatOwner'));
console.log(find([0,1,2,3,4,4,4,5,6,1,43],5));
console.log(findInObj(fullnames,'isCatOwner'));
console.log(removeVowels(text));
console.log(doubleOddNumbers([1,2,3,4,5]));
