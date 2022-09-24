class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {

    if (!this.root) {
      this.root = new Node(val)
      return this
    }

    let current = this.root
    let searching = true

    while (searching) {
      if (val > current.val) {
        if (current.right) {
          current = current.right
        } else {
          current.right = new Node(val)
          searching = false
          return this
        }
      }
      else {
        if (current.left) {
          current = current.left
        } else {
          current.left = new Node(val)
          searching = false
          return this
        }
      }
    }

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {

    if (!this.root) {
      this.root = new Node(val)
      return this
    }

    function helper(node) {
      if (val > node.val) {
        if (node.right) { helper(node.right) }
        else { node.right = new Node(val) }
      } else {
        if (node.left) { helper(node.left) }
        else { node.left = new Node(val) }
      }
    }

    helper(this.root)

    return this

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {

    let current = this.root

    while (current) {
      if (current.val === val) return current
      current = val < current.val ? current.left : current.right
    }

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {

    if (!node) return undefined
    if (node.val === val) return node
    if (val < node.val) {
      if (!node.left) return undefined
      return this.findRecursively(val, node.left)
    }
    else {
      if (!node.right) return undefined
      return this.findRecursively(val, node.right)
    }

  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root) {

    let visited = []

    if (!node) return []
    else {
      visited.push(node.val)
      visited.push(...this.dfsPreOrder(node.left))
      visited.push(...this.dfsPreOrder(node.right))
    }

    return visited

  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node = this.root) {

    let visited = []

    if (!node) return []
    else {
      visited.push(...this.dfsInOrder(node.left))
      visited.push(node.val)
      visited.push(...this.dfsInOrder(node.right))
    }

    return visited

  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node = this.root) {

    let visited = []

    if (!node) return []
    else {
      visited.push(...this.dfsPostOrder(node.left))
      visited.push(...this.dfsPostOrder(node.right))
      visited.push(node.val)
    }

    return visited

  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {

    let node = this.root
    let queue = [node]
    let data = []

    while (queue.length > 0) {
      node = queue.shift()
      data.push(node.val)
      if (node.left) { queue.push(node.left) }
      if (node.right) { queue.push(node.right) }
    }

    return data

  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {

  }
}

module.exports = BinarySearchTree;
