import { findGears, getPartNumbers } from './utils'
import { getInput } from 'helpers/index'

const lines = getInput(import.meta.dir)

console.info(
  '[DAY 003 // PART 001]',
  'Summarization of valid parts',
  getPartNumbers(lines).reduce((a, b) => a + b, 0)
)

console.info(
  '[DAY 003 // PART 002]',
  'Summarization gears',
  findGears(lines).reduce((a, b) => (a || 0) + (b || 0), 0)
)
