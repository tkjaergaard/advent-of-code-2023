import { getInput } from 'helpers/index'
import { calculateAnswer, toEntries, turnIntoOneRace } from './utils'

const lines = getInput(import.meta.dir, 'example.txt')
const entries = toEntries(lines)
const part1Answer = calculateAnswer(entries)

console.info('[DAY 006 // PART 001]', '[task]', part1Answer)

const race = turnIntoOneRace(entries)
const part2Answer = calculateAnswer(race)

console.info('[DAY 006 // PART 002]', '[task]', part2Answer)
