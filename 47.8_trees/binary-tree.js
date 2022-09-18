/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {

    function minDepthR(node) {
      if (node === null) return 0
      if (node.left === null & node.right === null) return 1
      else return Math.min(minDepthR(node.left), minDepthR(node.right)) + 1
    }

    return minDepthR(this.root)

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {

    function maxDepthR(node) {
      if (node === null) return 0
      if (node.left === null & node.right === null) return 1
      else return Math.max(maxDepthR(node.left), maxDepthR(node.right)) + 1
    }

    return maxDepthR(this.root)

  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {

    let total = 0

    function maxSumR(node) {
      if (node === null) return 0
      const left = maxSumR(node.left)
      const right = maxSumR(node.right)
      total = Math.max(total, node.val + left + right)
      return Math.max(0, left + node.val, right + node.val)
    }

    maxSumR(this.root)
    return total

  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    

  }


}

module.exports = { BinaryTree, BinaryTreeNode };
