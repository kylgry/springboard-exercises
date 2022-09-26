function curriedAdd(sum) {
  if (sum === undefined) return 0
  return function addNext(num) {
    if (num === undefined) return sum
    sum += num
    return addNext
  }
}

module.exports = { curriedAdd };
