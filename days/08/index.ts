import { getInput } from 'helpers/index'
import { findGhostPathSteps, findPathSteps, parseInput } from './utils'

const lines = getInput(import.meta.dir)

const { directions, paths } = parseInput(lines)

console.info(
  '[DAY 008 // PART 001]',
  'Find required steps to reach ZZZ',
  findPathSteps('AAA', paths, directions).steps
)

console.info(
  '[DAY 008 // PART 002]',
  'Find steps to reach all ending with Z',
  findGhostPathSteps('A', 'Z', paths, directions)
)
