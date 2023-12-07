import { describe, test, expect } from 'bun:test'
import { getInput } from 'helpers/index'
import { calculateTotalSum, ranks, ranksWithJoker } from './utils'

const inputs = getInput(import.meta.dir)
const exampleInput = getInput(import.meta.dir, 'example.txt')

describe('Day 7', () => {
  test('Part 1: Example', () => {
    expect(calculateTotalSum(exampleInput)).toBe(6440)
  })

  test('Part 1: Answer', () => {
    expect(calculateTotalSum(inputs)).toBe(246409899)
  })

  test('Part 2: Example', () => {
    expect(calculateTotalSum(exampleInput, true)).toBe(5905)
  })

  test('Part 2: Answer', () => {
    expect(calculateTotalSum(inputs, true)).toBe(244848487)
  })
})
