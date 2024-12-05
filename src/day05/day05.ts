type PageOrderingRule = readonly [from: number, to: number];
type PageOrderingGraph = ReadonlyMap<number, readonly number[]>;

function createGraph(rules: Iterable<PageOrderingRule>): PageOrderingGraph {
  const graph = new Map<number, number[]>();

  for (const [from, to] of rules) {
    let neighbors = graph.get(from);
    if (neighbors === undefined) {
      neighbors = [];
      graph.set(from, neighbors);
    }
    neighbors.push(to);
  }

  return graph;
}

function createUpdateValidator(graph: PageOrderingGraph) {
  return (update: readonly number[]): boolean => {
    for (const [fromIndex, fromValue] of update.entries()) {
      for (const toValue of graph.get(fromValue) ?? []) {
        const toIndex = update.indexOf(toValue);
        if (toIndex !== -1 && toIndex < fromIndex) {
          return false;
        }
      }
    }

    return true;
  };
}

function createUpdateComparator(graph: PageOrderingGraph) {
  let currentOrder = 0;

  const orderCache = new Map<number, number>();
  const visited = new Set<number>();
  const processed = new Set<number>();

  const dfs = (node: number): void => {
    if (!processed.has(node) && !visited.has(node)) {
      visited.add(node);

      for (const neighbor of graph.get(node) ?? []) {
        dfs(neighbor);
      }

      currentOrder += 1;

      visited.delete(node);
      processed.add(node);
      orderCache.set(node, currentOrder);
    }
  };

  for (const node of graph.keys()) {
    if (!processed.has(node)) {
      dfs(node);
    }
  }

  return (a: number, b: number): number => {
    return (orderCache.get(a) ?? 0) - (orderCache.get(b) ?? 0);
  };
}

export function part1(input: string): number {
  const rules = input
    .matchAll(/^(\d+)\|(\d+)$/gm)
    .map((match) => [Number(match[1]), Number(match[2])] as const);

  const updateValidator = createUpdateValidator(createGraph(rules));

  const updates = input
    .matchAll(/^(?:\d+)(?:,\d+)*$/gm)
    .map((match) => match[0].split(",").map(Number));

  return updates
    .filter(updateValidator)
    .map((update) => update[Math.floor(update.length / 2)]!)
    .reduce((a, b) => a + b, 0);
}

export function part2(input: string): number {
  const rules = input
    .matchAll(/^(\d+)\|(\d+)$/gm)
    .map((match) => [Number(match[1]), Number(match[2])] as const)
    .toArray();

  const validator = createUpdateValidator(createGraph(rules));

  const updates = input
    .matchAll(/^(?:\d+)(?:,\d+)*$/gm)
    .map((match) => match[0].split(",").map(Number));

  return updates
    .filter((update) => !validator(update))
    .map((update) => {
      const graph = createGraph(
        rules
          .values()
          .filter(([from, to]) => update.includes(from) && update.includes(to)),
      );

      update.sort(createUpdateComparator(graph));

      return update[Math.floor(update.length / 2)]!;
    })
    .reduce((a, b) => a + b, 0);
}
