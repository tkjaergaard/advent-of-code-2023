import { chunk, getRawInput } from 'helpers/index'
import { parseInput, findLowestLocation } from './utils'

const entries = getRawInput(import.meta.dir).split(/^\n/gim)

const { seeds, almanacs } = parseInput(entries)

const blocks = Object.values(almanacs)
const part1 = findLowestLocation(
  seeds.map((seed) => [seed, seed + 1]),
  blocks
)

const part2 = findLowestLocation(
  chunk(seeds, 2).map(([seed, range]) => [seed, seed + range]),
  blocks
)

console.info('[DAY 005 // PART 001]', 'Lowest location number', part1)
console.info('[DAY 005 // PART 002]', 'Lowest location number', part2)
