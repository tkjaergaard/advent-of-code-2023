export const parseInput = (lines: string[]) => {
  let directions = (lines.shift() as string)
    .split('')
    .map((direction) => (direction == 'L' ? 0 : 1))

  const paths = Object.fromEntries(
    lines.filter(Boolean).map((line) => {
      const [id, p] = line.split(' = ')

      return [id, p.replace(/(\(|\))/gi, '').split(', ')]
    })
  )

  return { directions, paths }
}

export const findPathSteps = (
  startNode: string,
  paths: Record<string, Array<string>>,
  directions: Array<0 | 1>,
  endingCharacter: string = 'ZZZ'
): { steps: number; node: string } => {
  let currentPosition = startNode
  let steps = 0

  while (!currentPosition.endsWith(endingCharacter)) {
    steps++

    const nextDirection = directions[0]
    currentPosition = paths[currentPosition][nextDirection]

    const walked: 0 | 1 = directions.splice(0, 1)[0]
    directions.push(walked)
  }

  return { steps, node: currentPosition }
}

export const findGhostPathSteps = (
  startingNodesEndingLetter: string,
  endingNodesTrailingLetter: string,
  paths: Record<string, Array<string>>,
  _directions: Array<0 | 1>
) => {
  const startingNodes = Object.keys(paths).filter((key) =>
    key.endsWith(startingNodesEndingLetter)
  )

  let directions = [..._directions]
  let cycles: number[][] = []

  for (let node of startingNodes) {
    let dirs = [...directions]
    let step_count = 0

    while (!node.endsWith(endingNodesTrailingLetter)) {
      step_count++
      node = paths[node][dirs[0]]

      const prev: (1 | 0)[] = dirs.splice(0, 1)
      dirs.push(prev[0])
    }

    cycles.push([step_count])
  }

  return calculateCycles(cycles.map((cycle) => cycle[0]))
}

export const calculateCycles = (cycles: number[]) => {
  let lcm = cycles.pop() as number

  for (const cycle of cycles) {
    lcm = (lcm * cycle) / gcd(lcm, cycle)
  }

  return lcm
}

export const gcd = (a: number, b: number): number => {
  if (b) {
    return gcd(b, a % b)
  } else {
    return Math.abs(a)
  }
}
