import { chunk, getInput } from 'helpers/index'
import { calculateAnswer, parseData, toEntries, turnIntoOneRace } from './utils'

const lines = getInput(import.meta.dir)
const entries = toEntries(lines)
const part1Answer = calculateAnswer(entries)

console.info('[DAY 006 // PART 001]', '[task]', part1Answer)

const race = turnIntoOneRace(entries)
const part2Answer = calculateAnswer(race)

console.info('[DAY 006 // PART 002]', '[task]', part2Answer)
