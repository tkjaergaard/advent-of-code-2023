import { describe, test, expect } from 'bun:test'
import { getInput } from 'helpers/index'
import { calculateAnswer, toEntries, turnIntoOneRace } from './utils'

const inputs = getInput(import.meta.dir)
const exampleInput = getInput(import.meta.dir, 'example.txt')

describe('Day 6', () => {
  test('Part 1: Example', () => {
    const entries = toEntries(exampleInput)
    expect(calculateAnswer(entries)).toBe(288)
  })

  test('Part 1: Answer', () => {
    const entries = toEntries(inputs)
    expect(calculateAnswer(entries)).toBe(1710720)
  })

  test('Part 2: Example', () => {
    const entries = turnIntoOneRace(toEntries(exampleInput))
    expect(calculateAnswer(entries)).toBe(71503)
  })

  test('Part 2: Answer', () => {
    const entries = turnIntoOneRace(toEntries(inputs))
    expect(calculateAnswer(entries)).toBe(35349468)
  })
})
