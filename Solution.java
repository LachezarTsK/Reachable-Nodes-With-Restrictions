
public class Solution {

    private static final int START_NODE = 0;
    private int numberOfNodes;

    public int reachableNodes(int numberOfNodes, int[][] edges, int[] restricted) {
        this.numberOfNodes = numberOfNodes;
        boolean[] quickAccessRestricted = createQuickAccessRestricted(restricted);
        UnionFind unionFind = new UnionFind(numberOfNodes);

        joinReachableNodesFromStart(unionFind, edges, quickAccessRestricted);
        return countReachableNodesFromStart(unionFind, quickAccessRestricted);
    }

    private boolean[] createQuickAccessRestricted(int[] restricted) {
        boolean[] quickAccessRestricted = new boolean[numberOfNodes];
        for (int value : restricted) {
            quickAccessRestricted[value] = true;
        }
        return quickAccessRestricted;
    }

    private void joinReachableNodesFromStart(UnionFind unionFind, int[][] edges, boolean[] quickAccessRestricted) {
        for (int[] edge : edges) {
            int first = edge[0];
            int second = edge[1];
            if (quickAccessRestricted[first] || quickAccessRestricted[second]) {
                continue;
            }
            unionFind.join(first, second);
        }
    }

    private int countReachableNodesFromStart(UnionFind unionFind, boolean[] quickAccessRestricted) {
        int numberOfReachableNodesFromStart = 0;
        for (int node = 0; node < numberOfNodes; ++node) {
            if (quickAccessRestricted[node]) {
                continue;
            }
            if (unionFind.findParent(node) == START_NODE) {
                ++numberOfReachableNodesFromStart;
            }
        }
        return numberOfReachableNodesFromStart;
    }
}

class UnionFind {

    private final int[] parent;

    UnionFind(int numberOfNodes) {
        parent = new int[numberOfNodes];
        for (int node = 0; node < numberOfNodes; ++node) {
            parent[node] = node;
        }
    }

    int findParent(int node) {
        if (parent[node] != node) {
            parent[node] = findParent(parent[node]);
        }
        return parent[node];
    }

    void join(int first, int second) {
        first = findParent(first);
        second = findParent(second);
        if (first == second) {
            return;
        }
        if (first < second) {
            parent[second] = first;
        } else {
            parent[first] = second;
        }
    }
}
