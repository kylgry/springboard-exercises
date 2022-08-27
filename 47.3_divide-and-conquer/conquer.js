function countZeroes(a) {

  let l = 0
  let u = a.length - 1

  if (a[0] === 0) return (a.length)
  if (a[a.length-1] === 1) return 0

  while ((u-l) >= 0) {
    const m = Math.floor(0.5*(u+l))
    if (a[m] === 0) {u = m-1}
    else if (a[m+1] === 1) {l=m+1}
    else return (a.length-m-1)
  }

  return -1

}

function sortedFrequency(a,n) {

  let l = 0
  let u = a.length-1
  let fn = -1 // first n
  let ln = -1 // last n

  if(a[0] === n) {fn = 0}
  if(a[a.length-1] === n) {ln = a.length-1}

  while(u >= l && fn === -1) {
    const m = Math.floor(0.5*(u+l))
    if (a[m] === n) {u = m-1}
    else if (a[m+1] < n) {l = m+1}
    else {fn = m+1}
  }

  l = fn
  u = a.length-1

  while((u-l) >= 0 && ln === -1) {
    const m = Math.floor(0.5*(u+l))
    if (a[m] > n) {u = m-1}
    else if (a[m+1] === n) {l = m+1}
    else {ln = m}
  }

  if (ln === -1) return -1
  return (ln-fn+1)

}


function findRotationCount(a) {

  let l = 0
  let u = a.length - 1

  if (a[0] < a[a.length-1]) return 0

  while (u >= l) {
    const m = Math.floor(0.5*(u+l))

    if (a[m+1] > a[m]) {
      if (a[m] > a[a.length-1]) {l = m+1}
      else { u = m-1 }
    }
    else return m+1

  }

  return -1

}

function binarySearch(a,n) {

  let l = 0
  let u = a.length - 1

  while (u >= l) {
    const m = Math.floor(0.5*(u+l))
    if (a[m] < n) {l = m+1}
    else if (a[m] > n) {u = m-1}
    else return m
  }

  return -1

}

function findRotatedIndex(a,n) {

  const m = findRotationCount(a)
  const ua = a.slice(m).concat(a.slice(0,m))
  const b = binarySearch(ua,n)
  if (b === -1) return -1
  else if (b > m) return b-m
  else if (m > b) return m+b

}

function findFloor(a,n) {
  let l = 0
  let u = a.length - 1

  if (a[0] > n) return -1
  if (a[a.length-1] < n) return a[a.length-1]

  while (u >= l) {
    const m = Math.floor(0.5*(u+l))
    if (a[m] > n) {u = m-1}
    else if(a[m] < n) {
      if (a[m+1] > n) return a[m]
      else {l = m+1}
    }
  }

  return -1

}

module.exports = {
  countZeroes,
  sortedFrequency,
  findRotatedIndex,
  findRotationCount,
  findFloor
}
