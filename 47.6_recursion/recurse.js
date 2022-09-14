function product(array){
  if (array.length === 1) return array[0]
  return array[0] * product(array.slice(1))
}

function longest(words, out='', i=0){
  if (i === words.length) return out
  if (words[i].length > out.length) { out = words[i] }
  return longest(words, out, i+1)
}

function everyOther(word, out='', i=0) {
  if (i >= word.length) return out
  out = out.concat(word[i])
  return everyOther(word, out, i+2)
}

function isPalindrome(word, out=true, i=0) {
  if (i === Math.floor(word.length/2)) return out
  if (word[i] == word.split("").reverse().join("")[i]){
    return isPalindrome(word, out, i+1)
  }
  else return false
}

function findIndex(array, string, i=0) {
  if (i == array.length) return -1
  if (array[i]==string) return i
  else { return findIndex(array, string, i+1) }
}

function revString(string, out=[], i=0) {
  if (i == string.length) return out.join("")
  out.unshift(string[i])
  return revString(string, out, i+1)
}

function gatherStrings(obj, out=[]) {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      out.push(obj[key])
    }
    else if (typeof obj[key] === 'object') {
      out.push(...gatherStrings(obj[key]))
    }
  }
  return out
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings
}
