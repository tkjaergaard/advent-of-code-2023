import { describe, test, expect } from 'bun:test'
import { getTotalNumberOfCards, parseCards } from './utils'
import { getInput } from 'helpers/index'

const inputs = getInput(import.meta.dir)
const cards = parseCards(inputs)

describe('Day 3', () => {
  test('It should calculate the total number of points', () => {
    expect(cards.map((card) => card.points).reduce((a, b) => a + b, 0)).toBe(
      19135
    )
  })

  test('It should calculate the total number of scratchcards', () => {
    expect(getTotalNumberOfCards(cards)).toBe(5704953)
  })
})
