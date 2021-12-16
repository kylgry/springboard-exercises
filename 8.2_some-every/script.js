
function hasOddNumber(array) {
  return array.some(function(value) {
    return value%2 != 0;
  })
}

function hasAZero(number) {
  return [...number.toString()].some(function(num) {
    return num == 0;
  })
}

function hasOnlyOddNumbers(array) {
  return array.every(function(value) {
    return value%2 != 0;
  })
}

function hasNoDuplicates(array) {
  return [...new Set(array)].length === array.length;
}

function hasCertainKey(objectArray, key) {
  return objectArray.every(function(object){
    return object[key] != undefined;
  })
}

function hasCertainValue(objectArray, key, value) {
  return objectArray.every(function(object){
    return object[key] == value;
  })
}

// console.log(hasOddNumber([1,2,2,2,2,2,4]));
// console.log(hasOddNumber([2,2,2,2,2,4]));
// console.log(hasAZero(33321232131012));
// console.log(hasAZero(1212121));
// console.log(hasOnlyOddNumbers([1,3,5,7]));
// console.log(hasOnlyOddNumbers([1,2,3,5,7]));
console.log(hasNoDuplicates([1,2,3,1]));
console.log(hasNoDuplicates([1,2,3]));

let arr = [
    {title: "Instructor", first: 'Elie', last:"Schoppik"},
    {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true},
    {title: "Instructor", first: 'Matt', last:"Lane"},
    {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
  ];

// console.log(hasCertainKey(arr,'first'));
// console.log(hasCertainKey(arr,'isCatOwner'));
// console.log(hasCertainValue(arr,'title','Instructor'));
// console.log(hasCertainValue(arr,'first','Elie'));
