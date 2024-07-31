
function reachableNodes(numberOfNodes: number, edges: number[][], restricted: number[]): number {
    this.START_NODE = 0;
    this.numberOfNodes = numberOfNodes;

    const quickAccessRestricted = createQuickAccessRestricted(restricted);
    const unionFind = new UnionFind(this.numberOfNodes);

    joinReachableNodesFromStart(unionFind, edges, quickAccessRestricted);
    return countReachableNodesFromStart(unionFind, quickAccessRestricted);
};

function createQuickAccessRestricted(restricted: number[]): boolean[] {
    const quickAccessRestricted = new Array(this.numberOfNodes);
    for (let value of restricted) {
        quickAccessRestricted[value] = true;
    }
    return quickAccessRestricted;
}

function joinReachableNodesFromStart(unionFind: UnionFind, edges: number[][], quickAccessRestricted: boolean[]): void {
    for (let edge of edges) {
        const first = edge[0];
        const second = edge[1];
        if (quickAccessRestricted[first] || quickAccessRestricted[second]) {
            continue;
        }
        unionFind.join(first, second);
    }
}

function countReachableNodesFromStart(unionFind: UnionFind, quickAccessRestricted: boolean[]): number {
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

    private parent: number[];

    constructor(numberOfNodes: number) {
        this.parent = new Array(numberOfNodes);
        for (let node = 0; node < numberOfNodes; ++node) {
            this.parent[node] = node;
        }
    }

    findParent(node: number): number {
        if (this.parent[node] !== node) {
            this.parent[node] = this.findParent(this.parent[node]);
        }
        return this.parent[node];
    }

    join(first: number, second: number): void {
        first = this.findParent(first);
        second = this.findParent(second);
        if (first === second) {
            return;
        }
        if (first < second) {
            this.parent[second] = first;
        } else {
            this.parent[first] = second;
        }
    }
}
