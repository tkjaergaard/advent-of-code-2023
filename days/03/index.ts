import { findGears, getPartNumbers } from './utils'
import { getInput, sum } from 'helpers/index'

const lines = getInput(import.meta.dir)

console.info(
  '[DAY 003 // PART 001]',
  'Summarization of valid parts',
  sum(getPartNumbers(lines))
)

console.info(
  '[DAY 003 // PART 002]',
  'Summarization gears',
  sum(findGears(lines))
)
