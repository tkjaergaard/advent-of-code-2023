export const parseInput = (entries: string[]) => {
  const [seeds, ...almanac] = entries.map((entry) => {
    const [section, values] = entry.split(':').map((s) => s.trim())

    return [section, values]
  })

  return {
    seeds: parseSeeds(seeds[1]),
    almanacs: almanac.map(parseAlmanac).reduce((a, b) => ({ ...a, ...b }), {}),
  }
}

export const parseAlmanac = (almanac: string[]) => {
  const id = almanac[0].replace(' map', '')
  const values = almanac[1].split('\n').map((l) => l.split(' ').map(Number))

  return {
    [id]: values,
  }
}

export const parseSeeds = (seeds: string) => {
  return seeds.split(' ').map(Number)
}

export const findLowestLocation = (seeds: number[][], blocks: number[][][]) => {
  let _seeds = [...seeds]

  for (const ranges of blocks) {
    let _ = []

    while (_seeds.length) {
      const [start, end] = _seeds.pop() as [number, number]

      let found = false

      for (const range of ranges) {
        const [a, b, c] = range
        const os = Math.max(start, b)
        const oe = Math.min(end, b + c)

        if (os < oe) {
          found = true
          _.push([os - b + a, oe - b + a])

          if (os > start) {
            _seeds.push([start, os])
          }

          if (end > oe) {
            _seeds.push([oe, end])
          }
          break
        }
      }

      if (!found) {
        _.push([start, end])
      }
    }

    _seeds = _
  }

  const starts = _seeds.reduce((a, b) => a.concat(b[0]), [])
  const min = Math.min(...starts)

  return min
}
