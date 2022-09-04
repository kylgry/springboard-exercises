const Stack = require("./stack")

describe("push", function() {

  it("works", function() {

    let s = new Stack(['John', 'Amy', 'Jennifer', 'Ryan'])

    s.push('Mary')
    expect(s.length).toBe(5)
    expect(s.head.val).toBe('John')
    expect(s.tail.val).toBe('Mary')

  })

})

describe("pop", function() {

  it("works", function() {

    let s = new Stack(['John', 'Amy', 'Jennifer', 'Ryan'])

    s.pop()
    expect(s.length).toBe(3)
    expect(s.head.val).toBe('John')
    expect(s.tail.val).toBe('Jennifer')

    s.pop()
    expect(s.length).toBe(2)
    expect(s.head.val).toBe('John')
    expect(s.tail.val).toBe('Amy')

    s.pop()
    expect(s.length).toBe(1)
    expect(s.head.val).toBe('John')
    expect(s.tail.val).toBe('John')


    s.pop()
    expect(s.length).toBe(0)
    expect(s.head).toBe(null)

  })

})

describe("peek", function() {

  it("works", function() {

    let q = new Stack(['John', 'Amy', 'Jennifer', 'Ryan'])
    expect(q.peek()).toBe('John')

  })

})
