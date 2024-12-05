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
  return (a: number, b: number): number => {
    // This is apparently enough 🙈
    return graph.get(a)?.includes(b) ? -1 : 0;
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

  const graph = createGraph(rules);

  const validator = createUpdateValidator(graph);
  const comparator = createUpdateComparator(graph);

  const updates = input
    .matchAll(/^(?:\d+)(?:,\d+)*$/gm)
    .map((match) => match[0].split(",").map(Number));

  return updates
    .filter((update) => !validator(update))
    .map((update) => {
      update.sort(comparator);
      return update[Math.floor(update.length / 2)]!;
    })
    .reduce((a, b) => a + b, 0);
}
