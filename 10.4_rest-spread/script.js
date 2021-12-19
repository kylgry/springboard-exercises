//
// function filterOutOdds() {
//   var nums = Array.prototype.slice.call(arguments);
//   return nums.filter(function(num) {
//     return num % 2 === 0
//   });
// }

const filterOutOdds = (...nums) => nums.filter((num) => num % 2 === 0)

const findMin = (...nums) => nums.reduce((acc,next) => acc < next ? acc : next )

const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2})

const removeRandom = (...items) => {
  items.splice(Math.floor(items.length*Math.random()),1);
  return items;
}

const extend = (array1, array2) => [...array1, ...array2]

const addKeyVal = (obj, key, val) => {
  newObj = {...obj}
  newObj[key] = val;
  return newObj;
}

const removeKey = (obj, key) => {
  newObj = {...obj}
  delete newObj[key];
  return newObj;
}

const combine = (obj1, obj2) => ({...obj1, ...obj2})

const update = (obj, key, val) => {
  newObj = {...obj}
  newObj[key] = val;
  return newObj;
}


console.log(filterOutOdds(1,5,2,8,10,12,4,3,7))
console.log(findMin(-10,6,40,4028,-1000))
console.log(mergeObjects({a:1, b:2}, {c:3, d:4})) // {a:1, b:2, c:3, d:4}
console.log(removeRandom("blah","test",4,"book"))
console.log(extend([1,2],[3,4]))
console.log(addKeyVal({blah: 1, blah2: 3},'blah4',4))
console.log(removeKey({blah: 1, blah2: 3},'blah2'))
console.log(combine({a:1, b:2}, {c:3, d:4}))
