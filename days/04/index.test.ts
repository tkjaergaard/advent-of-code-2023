import { describe, test, expect } from 'bun:test'
import { getTotalNumberOfCards, parseCards } from './utils'
import { getInput, sum } from 'helpers/index'

const inputs = getInput(import.meta.dir)
const cards = parseCards(inputs)

describe('Day 3', () => {
  test('It should calculate the total number of points', () => {
    expect(sum(cards.map((card) => card.points))).toBe(19135)
  })

  test('It should calculate the total number of scratchcards', () => {
    expect(getTotalNumberOfCards(cards)).toBe(5704953)
  })
})
