import { describe, test, expect } from 'bun:test'
import { getRawInput, chunk } from 'helpers/index'
import { parseInput, findLowestLocation } from './utils'

const inputs = getRawInput(import.meta.dir).split(/^\n/gim)
const exampleInput = getRawInput(import.meta.dir, 'example.txt').split(/^\n/gim)

describe('Day 5', () => {
  test('Part 1: Example', () => {
    const { seeds, almanacs } = parseInput(exampleInput)
    const blocks = Object.values(almanacs)

    expect(
      findLowestLocation(
        seeds.map((seed) => [seed, seed + 1]),
        blocks
      )
    ).toBe(35)
  })

  test('Part 1: Answer', () => {
    const { seeds, almanacs } = parseInput(inputs)
    const blocks = Object.values(almanacs)

    expect(
      findLowestLocation(
        seeds.map((seed) => [seed, seed + 1]),
        blocks
      )
    ).toBe(388071289)
  })

  test('Part 2: Example', () => {
    const { seeds, almanacs } = parseInput(exampleInput)
    const blocks = Object.values(almanacs)

    expect(
      findLowestLocation(
        chunk(seeds, 2).map(([seed, range]) => [seed, seed + range]),
        blocks
      )
    ).toBe(46)
  })

  test('Part 2: Answer', () => {
    const { seeds, almanacs } = parseInput(inputs)
    const blocks = Object.values(almanacs)

    expect(
      findLowestLocation(
        chunk(seeds, 2).map(([seed, range]) => [seed, seed + range]),
        blocks
      )
    ).toBe(84206669)
  })
})
