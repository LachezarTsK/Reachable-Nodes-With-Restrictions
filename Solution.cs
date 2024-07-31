
using System;

public class Solution
{
    private static readonly int START_NODE = 0;
    private int numberOfNodes;

    public int ReachableNodes(int numberOfNodes, int[][] edges, int[] restricted)
    {
        this.numberOfNodes = numberOfNodes;
        bool[] quickAccessRestricted = CreateQuickAccessRestricted(restricted);
        UnionFind unionFind = new UnionFind(numberOfNodes);

        JoinReachableNodesFromStart(unionFind, edges, quickAccessRestricted);
        return CountReachableNodesFromStart(unionFind, quickAccessRestricted);
    }

    private bool[] CreateQuickAccessRestricted(int[] restricted)
    {
        bool[] quickAccessRestricted = new bool[numberOfNodes];
        foreach (int value in restricted)
        {
            quickAccessRestricted[value] = true;
        }
        return quickAccessRestricted;
    }

    private void JoinReachableNodesFromStart(UnionFind unionFind, int[][] edges, bool[] quickAccessRestricted)
    {
        foreach (int[] edge in edges)
        {
            int first = edge[0];
            int second = edge[1];
            if (quickAccessRestricted[first] || quickAccessRestricted[second])
            {
                continue;
            }
            unionFind.Join(first, second);
        }
    }

    private int CountReachableNodesFromStart(UnionFind unionFind, bool[] quickAccessRestricted)
    {
        int numberOfReachableNodesFromStart = 0;
        for (int node = 0; node < numberOfNodes; ++node)
        {
            if (quickAccessRestricted[node])
            {
                continue;
            }
            if (unionFind.FindParent(node) == START_NODE)
            {
                ++numberOfReachableNodesFromStart;
            }
        }
        return numberOfReachableNodesFromStart;
    }
}


class UnionFind
{

    private int[] parent;

    public UnionFind(int numberOfNodes)
    {
        parent = new int[numberOfNodes];
        for (int node = 0; node < numberOfNodes; ++node)
        {
            parent[node] = node;
        }
    }

    public int FindParent(int node)
    {
        if (parent[node] != node)
        {
            parent[node] = FindParent(parent[node]);
        }
        return parent[node];
    }

    public void Join(int first, int second)
    {
        first = FindParent(first);
        second = FindParent(second);
        if (first == second)
        {
            return;
        }
        if (first < second)
        {
            parent[second] = first;
        }
        else
        {
            parent[first] = second;
        }
    }
}
