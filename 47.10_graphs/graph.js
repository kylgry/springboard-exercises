class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) { this.nodes.add(vertex) }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) { node.adjacent.delete(vertex) }
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start]
    let seen = new Set()
    seen.add(start)
    let connected = [start.value]
    while (toVisitStack.length > 0) {
      let currentVertex = toVisitStack.pop()
      for (let adjacent of currentVertex.adjacent) {
        if (!seen.has(adjacent)) {
          toVisitStack.push(adjacent)
          seen.add(adjacent)
          connected.push(adjacent.value)
        }
      }
    }
    console.log(connected)
    return connected
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start]
    let seen = new Set()
    seen.add(start)
    let connected = [start.value]
    while (toVisitQueue.length > 0) {
      let currentVertex = toVisitQueue.shift()
      for (let adjacent of currentVertex.adjacent) {
        if (!seen.has(adjacent)) {
          toVisitQueue.push(adjacent)
          seen.add(adjacent)
          connected.push(adjacent.value)
        }
      }
    }
    return connected
  }
}

module.exports = {Graph, Node}
