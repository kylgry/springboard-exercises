class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {

  constructor(vals = []) {
    this.head = null
    this.tail = null
    this.length = 0
    for (let val of vals) this.push(val)
  }

  push(val) {
    let newNode = new Node(val)
    if (this.head === null) this.head = newNode
    if (this.tail !== null) this.tail.next = newNode
    this.tail = newNode
    this.length += 1
  }

  pop() {

    if (this.isEmpty()) return null
    let node = this.head
    while (node.next !== null) {
      if (node.next == this.tail) {
        this.tail = node
        this.length -= 1
        return node.next.val
      }
      node = node.next
    }
    this.tail = null
    this.head = null
    this.length = 0
    return node.val

  }

  peek() {
    return this.head.val
  }

  isEmpty() {
    if (this.head === null) return true
    else return false
  }

}

module.exports = Stack;
