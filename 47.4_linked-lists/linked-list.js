/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null
    this.tail = null
    this.length = 0

    for (let val of vals) this.push(val)
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val)
    if (this.head === null) this.head = newNode
    if (this.tail !== null) this.tail.next = newNode
    this.tail = newNode
    this.length += 1
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val)
    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
    }
    else {
      newNode.next = this.head
      this.head = newNode
    }
    this.length += 1
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 0) return null
    if (this.length === 1) {
      const popped = this.head
      this.tail = null
      this.head = null
      this.length = 0
      return popped.val
    }
    else {
      let node = this.head
      while (node.next !== null) {
        if (node.next == this.tail) {
          this.tail = node
          this.length -= 1
          return node.next.val
        }
        node = node.next
      }
    }


  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0) return null
    if (this.length === 1) {
      const shifted = this.head
      this.tail = null
      this.head = null
      this.length = 0
      return shifted.val
    }
    else {
      const shifted = this.head
      this.head = this.head.next
      this.length -= 1
      return shifted.val
    }

  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let n = 0
    let node = this.head
    while (n < idx) {
      node = node.next
      n += 1
    }
    return node.val
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let n = 0
    let node = this.head
    while (n < idx) {
      node = node.next
      n += 1
    }
    node.val = val
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let n = 0
    let node = this.head
    let newNode = new Node(val)
    if (idx === 0) {
      newNode.next = this.head
      this.head = newNode
      this.tail = newNode.next
      this.length += 1
      if (this.tail === null) this.tail = this.head
      return
    }

    while (n < idx - 1) {
      if (node.next === null) return undefined
      node = node.next
      n += 1
    }
    console.log(this.tail)

    newNode.next = node.next
    node.next = newNode
    if (newNode.next === null) this.tail = newNode
    this.length += 1
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let n = 0
    let node = this.head
    if (idx === 0) {
      this.head = node.next
      this.length -= 1
      if (this.head === null) this.tail = null
      return node
    }

    while (n < idx - 1) {
      if (node.next === null) return undefined
      node = node.next
      n += 1
    }

    const removed = node.next
    node.next = node.next.next
    if (node.next === null) this.tail = node
    this.length -= 1
    return removed
  }

  /** average(): return an average of all values in the list */

  average() {
    let sum = 0
    let n = 0
    let node = this.head
    while (node !== null) {
      sum += node.val
      n += 1
      node = node.next
    }
    if (n === 0) return 0
    return sum/n
  }
}

module.exports = LinkedList;
