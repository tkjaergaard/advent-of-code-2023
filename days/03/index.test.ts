import { describe, test, expect } from 'bun:test'
import { findGears, getPartNumbers } from './utils'
import { getInput } from 'helpers/index'

const lines = getInput(import.meta.dir)
const exampleInput = getInput(import.meta.dir, 'example.txt')

describe('Day 03', () => {
  test('It should find the right part numbers', () => {
    const result = getPartNumbers(exampleInput)
    const results2 = getPartNumbers(lines)

    expect(result).toEqual([467, 35, 633, 617, 592, 755, 664, 598])
    expect(result.reduce((a, b) => a + b)).toBe(4361)
    expect(results2.reduce((a, b) => a + b)).toBe(528799)
  })

  test('It should find the right gears', () => {
    const result = findGears(exampleInput)
    const result2 = findGears(lines)

    expect(result).toEqual([16345, 451490])
    expect(result2.reduce((a, b) => a + b, 0)).toEqual(84907174)
  })
})
