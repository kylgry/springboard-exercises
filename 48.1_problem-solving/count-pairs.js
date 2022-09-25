// add whatever parameters you deem necessary
function countPairs(a, n) {

  let set = new Set(a)
  let count = 0
  for (let i of a) {
    set.delete(i)
    if (set.has(n - i)) { count++ }
  }
  return count
}

module.exports = countPairs
