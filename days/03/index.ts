import fs from 'fs'
import path from 'path'
import { findGears, getPartNumbers } from './utils'

const inputs = fs.readFileSync(
  path.resolve(import.meta.dir, 'input.txt'),
  'utf8'
)

const lines = inputs.split('\n')

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
