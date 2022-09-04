class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {

  constructor(vals = []) {
    this.head = null
    this.tail = null
    this.length = 0
    for (let val of vals) this.enqueue(val)
  }

  enqueue(val) {
    let newNode = new Node(val)
    if (this.head === null) this.head = newNode
    if (this.tail !== null) this.tail.next = newNode
    this.tail = newNode
    this.length += 1
  }

  dequeue() {
    if (this.isEmpty()) return undefined
    const dequeued = this.head
    this.head = this.head.next
    if (this.length === 1) this.tail = null
    this.length -= 1
    return dequeued.val
  }

  peek() {
    return this.head.val
  }

  isEmpty() {
    if (this.head === null) return true
    else return false
  }

}

module.exports = Queue;
