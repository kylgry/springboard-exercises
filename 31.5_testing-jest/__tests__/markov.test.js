const markov = require("../markov");


describe("markov machine", function () {

  let mm;

  beforeAll(function(){
    const text = "the cat in the hat is in the hat.";
    mm = new markov.MarkovMachine(text);
    mm.makeText();
  });

  test('words list has correct length', function() {
    expect(mm.words.length).toEqual(9);
  });

  test('chain contains last word', function() {
    expect(Object.keys(mm.chain)).toContain('hat.');
  });

});
