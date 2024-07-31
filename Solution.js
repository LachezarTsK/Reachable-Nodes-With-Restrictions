
/**
 * @param {number} numberOfNodes
 * @param {number[][]} edges
 * @param {number[]} restricted
 * @return {number}
 */
var reachableNodes = function (numberOfNodes, edges, restricted) {
    this.START_NODE = 0;
    this.numberOfNodes = numberOfNodes;

    const quickAccessRestricted = createQuickAccessRestricted(restricted);
    const unionFind = new UnionFind(this.numberOfNodes);

    joinReachableNodesFromStart(unionFind, edges, quickAccessRestricted);
    return countReachableNodesFromStart(unionFind, quickAccessRestricted);
};

/**
 * @param {number[]} restricted
 * @return {boolean[]}
 */
function createQuickAccessRestricted(restricted) {
    const quickAccessRestricted = new Array(this.numberOfNodes);
    for (let value of restricted) {
        quickAccessRestricted[value] = true;
    }
    return quickAccessRestricted;
}

/**
 * @param {UnionFind} unionFind
 * @param {number[][]} edges
 * @param {boolean[]} quickAccessRestricted
 * @return {void}
 */
function joinReachableNodesFromStart(unionFind, edges, quickAccessRestricted) {
    for (let edge of edges) {
        const first = edge[0];
        const second = edge[1];
        if (quickAccessRestricted[first] || quickAccessRestricted[second]) {
            continue;
        }
        unionFind.join(first, second);
    }
}

/**
 * @param {UnionFind} unionFind
 * @param {boolean[]} quickAccessRestricted
 * @return {number}
 */
function countReachableNodesFromStart(unionFind, quickAccessRestricted) {
    let numberOfReachableNodesFromStart = 0;
    for (let node = 0; node < this.numberOfNodes; ++node) {
        if (quickAccessRestricted[node]) {
            continue;
        }
        if (unionFind.findParent(node) === this.START_NODE) {
            ++numberOfReachableNodesFromStart;
        }
    }
    return numberOfReachableNodesFromStart;
}

class UnionFind {

    #parent;

    /**
     * @param {number} numberOfNodes
     */
    constructor(numberOfNodes) {
        this.#parent = new Array(numberOfNodes);
        for (let node = 0; node < numberOfNodes; ++node) {
            this.#parent[node] = node;
        }
    }

    /**
     * @param {number} node
     * @return {number}
     */
    findParent(node) {
        if (this.#parent[node] !== node) {
            this.#parent[node] = this.findParent(this.#parent[node]);
        }
        return this.#parent[node];
    }

    /**
     * @param {number} first
     * @param {number} second
     * @return {void}
     */
    join(first, second) {
        first = this.findParent(first);
        second = this.findParent(second);
        if (first === second) {
            return;
        }
        if (first < second) {
            this.#parent[second] = first;
        } else {
            this.#parent[first] = second;
        }
    }
}
