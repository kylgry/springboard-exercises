const { countZeroes,
        sortedFrequency,
        findRotatedIndex,
        findRotationCount,
        findFloor
       } = require("conquer");


describe("countZeroes", function () {

  test('works', function() {
    expect(countZeroes([1,1,1,1,0,0])).toEqual(2)
    expect(countZeroes([1,0,0,0,0])).toEqual(4)
    expect(countZeroes([0,0,0])).toEqual(3)
    expect(countZeroes([1,1,1,1])).toEqual(0)
    expect(countZeroes([1,0])).toEqual(1)
    expect(countZeroes([1,1,1,1,1,0])).toEqual(1)
    expect(countZeroes([1,1,1,0,0,0])).toEqual(3)
    expect(countZeroes([1,1,0,0,0,0])).toEqual(4)
  })

})

describe("sortedFrequency", function() {
  test('works', function() {
    expect(sortedFrequency([1,1,2,2,2,2,3],2)).toEqual(4)
    expect(sortedFrequency([1,1,2,2,2,2,3],3)).toEqual(1)
    expect(sortedFrequency([1,1,2,2,2,2,3],1)).toEqual(2)
    expect(sortedFrequency([1,1,2,2,2,2,3],4)).toEqual(-1)
    expect(sortedFrequency([1,2,2,2,2,5,5],2)).toEqual(4)
    expect(sortedFrequency([1,2,2,2,2,5,5],3)).toEqual(-1)
    expect(sortedFrequency([1,2,2,2,2,5,5],5)).toEqual(2)
    expect(sortedFrequency([1,2,2,2,2,5,5],1)).toEqual(1)
  })
})

describe("findRotatedIndex", function() {
  test('works', function() {
    expect(findRotatedIndex([3,4,1,2],4)).toEqual(1)
    expect(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8)).toEqual(2)
    expect(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)).toEqual(6)
    expect(findRotatedIndex([37,44,66,102,10,22],14)).toEqual(-1)
    expect(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)).toEqual(-1)
  })
})

describe("findRotationCount", function() {
  test('works', function() {
    expect(findRotationCount([15,18,2,3,6,12])).toEqual(2)
    expect(findRotationCount([7,9,11,12,5])).toEqual(4)
    expect(findRotationCount([7,9,11,12,15])).toEqual(0)
  })
})

describe("findFloor", function() {
  test('works', function() {
    expect(findFloor([1,2,8,10,10,12,19],9)).toEqual(8)
    expect(findFloor([1,2,8,10,10,12,19], 20)).toEqual(19)
    expect(findFloor([1,2,8,10,10,12,19], 0)).toEqual(-1)
  })
})
