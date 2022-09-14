const {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings
 } = require('./recurse')


describe("product of nums", function() {
  it("works", function() {
    expect(product([2,3,4])).toBe(24)
    expect(product([1,1,1,1,1,1])).toBe(1)
    expect(product([0,1,5,3,6,1])).toBe(0)
    expect(product([10,4,1,2])).toBe(80)
  })
})

describe("longest word", function() {
  it("works", function() {
    expect(longest(["hello", "hi", "hola"])).toBe("hello")
    expect(longest(["house", "car", "Supercalifragilisticexpialidocious"])).toBe("Supercalifragilisticexpialidocious")
  })
})

describe("every other character", function() {
  it("works", function() {
    expect(everyOther("hello")).toBe('hlo')
    expect(everyOther("inventanimate")).toBe('ivnaiae')
  })
})

describe("is word a palindrome?", function() {
  it("works", function() {
    expect(isPalindrome("tacocat")).toBe(true)
    expect(isPalindrome("tacodog")).toBe(false)
    expect(isPalindrome("iei")).toBe(true)
    expect(isPalindrome("cattac")).toBe(true)
    expect(isPalindrome("blah")).toBe(false)
  })
})

describe("find index", function() {
  it("works", function() {
    const animals = ["duck", "cat", "pony"]
    expect(findIndex(animals, "cat")).toBe(1)
    expect(findIndex(animals, "porcupine")).toBe(-1)
  })
})

describe("reverse string", function() {
  it("works", function() {
    expect(revString("porcupine")).toBe("enipucrop")
  })
})

describe("gather strings", function() {
  it("works", function() {

    let nestedObj = {
      firstName: "Lester",
      favoriteNumber: 22,
      moreData: {
        lastName: "Testowitz"
      },
      funFacts: {
        moreStuff: {
          anotherNumber: 100,
          deeplyNestedString: {
            almostThere: {
              success: "you made it!"
            }
          }
        },
        favoriteString: "nice!"
      }
    }

    expect(gatherStrings(nestedObj)).toEqual(["Lester", "Testowitz", "you made it!", "nice!"])
  })
})
