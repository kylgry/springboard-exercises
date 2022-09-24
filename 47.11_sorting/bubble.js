function bubbleSort(a) {

  for (let i = 0; i < a.length; i++) {
    let swapped = false
    for (let j = 0; j < a.length - i; j++) {
      if (a[j] > a[j+1]) {
        const temp = a[j]
        a[j] = a[j + 1]
        a[j + 1] = temp
        swapped = true
      }
    }
    if (!swapped) break
  }
  return a

}

module.exports = bubbleSort;
