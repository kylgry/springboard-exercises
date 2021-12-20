// 1: [1,2,3,4] (set)
// 2: 'ref'
// 3: { [1,2,3] => true, [1,2,3] => false }

const hasDuplicate = (array) => array.length == [...new Set(array)].length

console.log(hasDuplicate([1,3,2,1]))
console.log(hasDuplicate([1,5,-1,4]))

const vowelCount = (string) => {
  const onlyVowels = [...string.toLowerCase()].filter((v) => [...'aeiou'].includes(v))
  const vowelMap = new Map();
  for (let val of onlyVowels) { vowelMap.has(val) ? vowelMap.set(val,vowelMap.get(val)+1) : vowelMap.set(val,1) }
  return vowelMap;
}

console.log(vowelCount('awesome')) // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
console.log(vowelCount('Colt')) // Map { 'o' => 1 }
