// add whatever parameters you deem necessary

function findClosest(a,n) {

  let l = 0
  let u = a.length - 1

  while (u >= l) {
    const m = Math.floor(0.5*(u+l))
    if (n >= a[m]) {
      if (n < a[m+1]) { return m }
      else { l = m+1 }
    }
    else {u = m-1}
  }

}

function averagePair(a, average) {
  let i = findClosest(a, average)
  let j = i + 1
  let s = 2*average

  while (i >= 0 && j < a.length) {
    if (a[i] + a[j] == s) { return true }
    if (a[i] + a[j] < s) { j++ }
    else { i-- }
  }

  return false

}

module.exports = averagePair
