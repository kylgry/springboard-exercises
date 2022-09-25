function separatePositive(a) {

  let i = 0
  let j = 1

  while (j < a.length) {
    if (a[i] > 0 ) {
      i++
      j++
    }
    if (a[i] < 0) {
      if (a[j] < 0) { j++ }
      else {
        temp = a[i]
        a[i] = a[j]
        a[j] = temp
        i++
        j = i + 1
      }
    }
  }

  return a

}

module.exports = separatePositive
