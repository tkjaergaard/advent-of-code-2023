import { getInput } from 'helpers/index'
import { calculateTotalSum } from './utils'

const lines = getInput(import.meta.dir)

const AnswerPart1 = calculateTotalSum(lines)
const AnswerPart2 = calculateTotalSum(lines, true)

console.info('[DAY 007 // PART 001]', '[task]', AnswerPart1)
console.info('[DAY 007 // PART 002]', '[task]', AnswerPart2)
