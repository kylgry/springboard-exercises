/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {

    function rsum(node) {
      for (let child of node.children) {
        total += child.val
        if (child.children.length > 0)  rsum(child)
      }
    }

    let total = 0
    if (this.root) {
      total += this.root.val
      rsum(this.root)
    }
    return total

  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {

    function rcountEven(node) {
      for (let child of node.children) {
        if (child.val % 2 === 0) total++
        if (child.children.length > 0) rcountEven(child)
      }
    }

    let total = 0
    if (this.root) {
      if (this.root.val % 2 === 0) total++
      rcountEven(this.root)
    }
    return total

  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {

    function rnumGreater(node) {
      for (let child of node.children) {
        if (child.val > lowerBound) total++
        if (child.children.length > 0) rnumGreater(child)
      }
    }

    let total = 0
    if (this.root) {
      if (this.root.val > lowerBound) total++
      rnumGreater(this.root)
    }
    return total

  }
}

module.exports = { Tree, TreeNode };
