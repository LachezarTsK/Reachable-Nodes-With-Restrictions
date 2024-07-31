
class Solution {

    private companion object {
        const val START_NODE = 0
    }

    private var numberOfNodes = 0

    fun reachableNodes(numberOfNodes: Int, edges: Array<IntArray>, restricted: IntArray): Int {
        this.numberOfNodes = numberOfNodes
        val quickAccessRestricted: BooleanArray = createQuickAccessRestricted(restricted)
        val unionFind = UnionFind(numberOfNodes)

        joinReachableNodesFromStart(unionFind, edges, quickAccessRestricted)
        return countReachableNodesFromStart(unionFind, quickAccessRestricted)
    }

    private fun createQuickAccessRestricted(restricted: IntArray): BooleanArray {
        val quickAccessRestricted = BooleanArray(numberOfNodes)
        for (value in restricted) {
            quickAccessRestricted[value] = true
        }
        return quickAccessRestricted
    }

    private fun joinReachableNodesFromStart(
        unionFind: UnionFind,
        edges: Array<IntArray>,
        quickAccessRestricted: BooleanArray
    ) {
        for (edge in edges) {
            val first = edge[0]
            val second = edge[1]
            if (quickAccessRestricted[first] || quickAccessRestricted[second]) {
                continue
            }
            unionFind.join(first, second)
        }
    }

    private fun countReachableNodesFromStart(unionFind: UnionFind, quickAccessRestricted: BooleanArray): Int {
        var numberOfReachableNodesFromStart = 0
        for (node in 0..<numberOfNodes) {
            if (quickAccessRestricted[node]) {
                continue
            }
            if (unionFind.findParent(node) == START_NODE) {
                ++numberOfReachableNodesFromStart
            }
        }
        return numberOfReachableNodesFromStart
    }
}

class UnionFind(private val numberOfNodes: Int) {

    private var parent: IntArray = IntArray(numberOfNodes)

    init {
        for (node in 0..<numberOfNodes) {
            parent[node] = node
        }
    }


    fun findParent(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = findParent(parent[node])
        }
        return parent[node]
    }

    fun join(first: Int, second: Int) {
        val first = findParent(first)
        val second = findParent(second)
        if (first == second) {
            return
        }
        if (first < second) {
            parent[second] = first
        } else {
            parent[first] = second
        }
    }
}
