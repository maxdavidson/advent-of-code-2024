import { lines } from "../utils.ts";

function parseInput(input: string) {
  const edges = lines(input)
    .map((line) => line.split("-", 2).filter((node) => node !== undefined))
    .toArray();

  const neighbors = new Map<string, Set<string>>();

  for (const [nodeA, nodeB] of edges) {
    let neighborsA = neighbors.get(nodeA!);
    if (neighborsA === undefined) {
      neighborsA = new Set();
      neighbors.set(nodeA!, neighborsA);
    }
    neighborsA.add(nodeB!);

    let neighborsB = neighbors.get(nodeB!);
    if (neighborsB === undefined) {
      neighborsB = new Set();
      neighbors.set(nodeB!, neighborsB);
    }
    neighborsB.add(nodeA!);
  }

  return { edges, neighbors };
}

export function part1(input: string): number {
  const { edges, neighbors } = parseInput(input);

  const triplets = new Set<string>();

  for (const [nodeA, nodeB] of edges) {
    if (nodeA !== undefined && nodeB !== undefined) {
      const neighborsA = neighbors.get(nodeA)!;
      const neighborsB = neighbors.get(nodeB)!;

      for (const nodeC of neighborsA.intersection(neighborsB)) {
        if (
          nodeA.startsWith("t") ||
          nodeB.startsWith("t") ||
          nodeC.startsWith("t")
        ) {
          const triplet = [nodeA, nodeB, nodeC];
          triplet.sort();
          triplets.add(triplet.join(","));
        }
      }
    }
  }

  return triplets.size;
}

export function part2(input: string): string {
  const { edges, neighbors } = parseInput(input);

  function getNeighbor(node: string) {
    return neighbors.get(node)!;
  }

  function intersect(a: ReadonlySet<string>, b: ReadonlySet<string>) {
    return a.intersection(b);
  }

  let currentEdges = edges;

  for (;;) {
    const combos = new Map<string, string[]>();

    for (const nodes of currentEdges) {
      for (const neighborNode of nodes.map(getNeighbor).reduce(intersect)) {
        const combo = [...nodes, neighborNode];
        combo.sort();
        combos.set(combo.join(","), combo);
      }
    }

    if (combos.size === 0) {
      break;
    }

    currentEdges = combos.values().toArray();
  }

  return currentEdges[0]!.join(",");
}
