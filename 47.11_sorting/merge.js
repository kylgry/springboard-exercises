function merge(a, b) {

  let out = []
  let i = 0
  let j = 0

  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) {
      out.push(a[i])
      i++
    } else {
      out.push(b[j])
      j++
    }
  }

  while (i < a.length) {
    out.push(a[i])
    i++
  }

  while (j < b.length) {
    out.push(b[j])
    j++
  }

  return out

}

function mergeSort(a) {
  if (a.length <= 1) return a
  const mid = Math.floor(a.length/2)
  const left = mergeSort(a.slice(0,mid))
  const right = mergeSort(a.slice(mid))
  return merge(left, right)
}

module.exports = { merge, mergeSort }
