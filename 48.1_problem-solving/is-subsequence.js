// add whatever parameters you deem necessary
function isSubsequence(a, b) {
  let j = 0
  for (let i = 0; i < b.length; i++) {
    if (b[i] == a[j]) { j++ }
  }

  if (j == a.length) { return true }
  else { return false }
}

module.exports = isSubsequence
