import { describe, test, expect } from 'bun:test'
import { findGears, getPartNumbers } from './utils'
import { getInput, sum } from 'helpers/index'

const lines = getInput(import.meta.dir)
const exampleInput = getInput(import.meta.dir, 'example.txt')

describe('Day 03', () => {
  test('It should find the right part numbers', () => {
    const result = getPartNumbers(exampleInput)
    const results2 = getPartNumbers(lines)

    expect(result).toEqual([467, 35, 633, 617, 592, 755, 664, 598])
    expect(sum(result)).toBe(4361)
    expect(sum(results2)).toBe(528799)
  })

  test('It should find the right gears', () => {
    const result = findGears(exampleInput)
    const result2 = findGears(lines)

    expect(result).toEqual([16345, 451490])
    expect(sum(result2)).toEqual(84907174)
  })
})
