// add whatever parameters you deem necessary
function charCounts(string) {
  let out = {}
  for (let char of string) {
    if (out[char]) { out[char] += 1 }
    else { out[char] = 1 }
  }
  return out
}

function constructNote(msg, letters) {
  let letterCounts = charCounts(letters)
  for (let char of msg) {
    if (letterCounts[char] > 0) { letterCounts[char] -= 1 }
    else { return false }
  }
  return true
}

module.exports = constructNote
