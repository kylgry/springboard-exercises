
function extractValue(array, key){
    return array.reduce(function(accum,next){
        accum.push(next[key]);
        return accum;
    },[]);
}

function vowelCount(str){
  vowels = [...'aeiou']
  const strArray = [...str.toLowerCase()];
  return strArray.reduce(function(accum,next){
    if (vowels.includes(next)) {
      if (accum[next] == undefined) {
        accum[next] = 1;
      }
      else {
        accum[next]++;
      }
    }
    return accum;
  },{})
}

function addKeyAndValue(objectArray,key,value) {
  return objectArray.reduce(function(accum,next,index){
    next[key] = value;
    accum.push(next);
    return accum;
  },[])
}

function partition(array, callback) {
  return array.reduce(function(accum, next, index){
    if (callback(next)) {
      accum[0].push(next);
      return accum;
    }
    else {
      accum[1].push(next);
      return accum;
    }
  },[[],[]])
}

const arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];
console.log(extractValue(arr,'name'));

console.log(vowelCount('I am awesome and so are you'));

const arr2 = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];
console.log(addKeyAndValue(arr2,'title','instructor'));

function isEven(val){
  return val % 2 === 0;
}

const arr3 = [1,2,3,4,5,6,7,8];

console.log(partition(arr3, isEven));

function isLongerThanThreeCharacters(val){
  return val.length > 3;
}

const names = ['Elie', 'Colt', 'Tim', 'Matt'];

console.log(partition(names, isLongerThanThreeCharacters));
