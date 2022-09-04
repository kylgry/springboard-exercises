const Queue = require("./queue")

describe("enqueue", function() {

  it("works", function() {

    let q = new Queue(['John', 'Amy', 'Jennifer', 'Ryan'])

    q.enqueue('Mary')
    expect(q.length).toBe(5)
    expect(q.head.val).toBe('John')
    expect(q.tail.val).toBe('Mary')

  })

})

describe("dequeue", function() {

  it("works", function() {

    let q = new Queue(['John', 'Amy', 'Jennifer', 'Ryan'])

    q.dequeue()
    expect(q.length).toBe(3)
    expect(q.head.val).toBe('Amy')

    q.dequeue()
    expect(q.length).toBe(2)
    expect(q.head.val).toBe('Jennifer')

    q.dequeue()
    expect(q.length).toBe(1)
    expect(q.head.val).toBe('Ryan')

    q.dequeue()
    expect(q.length).toBe(0)
    expect(q.head).toBe(null)

  })

})

describe("peek", function() {

  it("works", function() {

    let q = new Queue(['John', 'Amy', 'Jennifer', 'Ryan'])
    expect(q.peek()).toBe('John')

  })

})
