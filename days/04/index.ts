import { getTotalNumberOfCards, parseCards } from './utils'
import { getInput, sum } from 'helpers/index'

const inputs = getInput(import.meta.dir)
const cards = parseCards(inputs)

console.info(
  '[DAY 004 // PART 001]',
  'Total stratchcard points',
  sum(cards.map((card) => card.points))
)

console.info(
  '[DAY 004 // PART 002]',
  'Total scratchcards',
  getTotalNumberOfCards(cards)
)
