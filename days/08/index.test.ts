import { describe, test, expect } from 'bun:test'
import { getInput } from 'helpers/index'
import { findGhostPathSteps, findPathSteps, parseInput } from './utils'

const inputs = getInput(import.meta.dir)
const exampleInput = getInput(import.meta.dir, 'example.txt')
const exampleInput2 = getInput(import.meta.dir, 'example2.txt')

describe('Day 7', () => {
  test('Part 1: Example', () => {
    const { directions, paths } = parseInput(exampleInput)

    expect(findPathSteps('AAA', paths, directions).steps).toBe(2)
  })

  test('Part 1: Answer', () => {
    const { directions, paths } = parseInput([...inputs])
    expect(findPathSteps('AAA', paths, directions).steps).toBe(16897)
  })

  test('Part 2: Example', () => {
    const { directions, paths } = parseInput(exampleInput2)
    expect(findGhostPathSteps('A', 'Z', paths, directions)).toBe(6)
  })

  test('Part 2: Answer', () => {
    const { directions, paths } = parseInput([...inputs])
    expect(findGhostPathSteps('A', 'Z', paths, directions)).toBe(16563603485021)
  })
})
