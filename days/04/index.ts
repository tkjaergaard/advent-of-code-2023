import { getTotalNumberOfCards, parseCards } from './utils'
import { getInput } from 'helpers/index'

const inputs = getInput(import.meta.dir)
const cards = parseCards(inputs)

console.info(
  '[DAY 004 // PART 001]',
  'Total stratchcard points',
  cards.map((card) => card.points).reduce((a, b) => a + b, 0)
)

console.info(
  '[DAY 004 // PART 002]',
  'Total scratchcards',
  getTotalNumberOfCards(cards)
)
