const { mean, median, mode } = require("./app");


describe("math", function () {

  beforeAll(function(){
  });

  test('calculates mean', function() {
    expect(mean([1,2,3,4,5,6,7,8,9,10])).toEqual(5.5);
  });

  test('calculates median of even set', function() {
    expect(mean([1,2,3,4])).toEqual(2.5);
  })

  test('calculates median of odd set', function() {
    expect(mean([1,2,3,4,5])).toEqual(3);
  })


});
