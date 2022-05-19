/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

    let chain = {};
    let words = this.words;
    const len = words.length;

    for (let i = 0; i < (len-1); i++) {
      const word = words[i];
      if (!(chain[word])) chain[word] = [];
      if (!(chain[word].includes(words[i+1]))) chain[word].push(words[i+1]);
    }

    if (chain[words[len-1]]) chain[words[len-1]].push(null);
    else chain[words[len-1]] = null;

    this.chain = chain;
  }


  /** return random text from chains */

  makeText(numWords = 500) {
    let text = this.words[Math.floor(Math.random()*this.words.length)];
    let nextWord = this.chain[text][Math.floor(Math.random()*this.chain[text].length)];
    let i = 1;
    while (nextWord != null && i != numWords) {
      text += " " + nextWord;
      if (this.chain[nextWord] == null) {
        nextWord = null;
      }
      else {
        nextWord = this.chain[nextWord][Math.floor(Math.random()*this.chain[nextWord].length)];
      }
      i++;
    }
    this.text = text;
  }
}

module.exports = {
  MarkovMachine,
};

// mm = new MarkovMachine("the cat in the hats loves to hat other cats and cat hats")
