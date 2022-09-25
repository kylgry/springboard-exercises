function sameFrequency(a, b) {

  let c = {}
  for (let i of a.toString()) {
    if (c[i]) c[i] += 1
    else c[i] = 1
  }
  for (let i of b.toString()) {
    if (c[i]) c[i] -= 1
    else return false
  }
  for (let i in c) {
    if (c[i] != 0) { return false }
  }

  return true

}

module.exports = sameFrequency
