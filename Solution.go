
package main

import "fmt"

const START_NODE = 0

var numberOfNodes int

func reachableNodes(totalNodes int, edges [][]int, restricted []int) int {
    numberOfNodes = totalNodes
    var quickAccessRestricted []bool = createQuickAccessRestricted(restricted)
    var unionFind = NewUnionFind(numberOfNodes)

    joinReachableNodesFromStart(unionFind, edges, quickAccessRestricted)
    return countReachableNodesFromStart(unionFind, quickAccessRestricted)
}

func createQuickAccessRestricted(restricted []int) []bool {
    quickAccessRestricted := make([]bool, numberOfNodes)
    for _, value := range restricted {
        quickAccessRestricted[value] = true
    }
    return quickAccessRestricted
}

func joinReachableNodesFromStart(unionFind *UnionFind, edges [][]int, quickAccessRestricted []bool) {
    for _, edge := range edges {
        first := edge[0]
        second := edge[1]
        if quickAccessRestricted[first] || quickAccessRestricted[second] {
            continue
        }
        unionFind.join(first, second)
    }
}

func countReachableNodesFromStart(unionFind *UnionFind, quickAccessRestricted []bool) int {
    var numberOfReachableNodesFromStart = 0
    for node := 0; node < numberOfNodes; node++ {
        if quickAccessRestricted[node] {
            continue
        }
        if unionFind.findParent(node) == START_NODE {
            numberOfReachableNodesFromStart++
        }
    }
    return numberOfReachableNodesFromStart
}

type UnionFind struct {
    numberOfNodes int
    parent        []int
}

func NewUnionFind(numberOfNodes int) *UnionFind {
    unionFind := &UnionFind{
        numberOfNodes: numberOfNodes,
        parent:        make([]int, numberOfNodes)}

    for node := 0; node < numberOfNodes; node++ {
        unionFind.parent[node] = node
    }
    return unionFind
}

func (unionFind *UnionFind) findParent(node int) int {
    if unionFind.parent[node] != node {
        unionFind.parent[node] = unionFind.findParent(unionFind.parent[node])
    }
    return unionFind.parent[node]
}

func (unionFind *UnionFind) join(first int, second int) {
    first = unionFind.findParent(first)
    second = unionFind.findParent(second)
    if first == second {
        return
    }
    if first < second {
        unionFind.parent[second] = first
    } else {
        unionFind.parent[first] = second
    }
}
