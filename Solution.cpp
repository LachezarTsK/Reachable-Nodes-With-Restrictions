
#include <span>
#include <vector>
using namespace std;

class UnionFind {

public:

    vector<int> parent;

    UnionFind() = default;
    ~UnionFind() = default;

    explicit UnionFind(int numberOfNodes) {
        parent.resize(numberOfNodes);
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
        }
        else {
            parent[first] = second;
        }
    }
};

class Solution {

    static const int START_NODE = 0;
    int numberOfNodes = 0;


public:
    int reachableNodes(int numberOfNodes, const vector<vector<int>>& edges, const vector<int>& restricted) {
        this->numberOfNodes = numberOfNodes;
        vector<bool> quickAccessRestricted = createQuickAccessRestricted(restricted);
        UnionFind unionFind(numberOfNodes);

        joinReachableNodesFromStart(unionFind, edges, quickAccessRestricted);
        return countReachableNodesFromStart(unionFind, quickAccessRestricted);
    }

    vector<bool> createQuickAccessRestricted(span<const int> restricted) const {
        vector<bool> quickAccessRestricted(numberOfNodes);
        for (const auto& value : restricted) {
            quickAccessRestricted[value] = true;
        }
        return quickAccessRestricted;
    }

    void joinReachableNodesFromStart(UnionFind& unionFind, span<const vector<int>> edges, const vector<bool>& quickAccessRestricted) const {
        for (const auto& edge : edges) {
            int first = edge[0];
            int second = edge[1];
            if (quickAccessRestricted[first] || quickAccessRestricted[second]) {
                continue;
            }
            unionFind.join(first, second);
        }
    }

    int countReachableNodesFromStart(UnionFind& unionFind, const vector<bool>& quickAccessRestricted) const {
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
};
