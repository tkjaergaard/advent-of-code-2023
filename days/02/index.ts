import {
  getNumberOfCubes,
  getPowerOfRound,
  isGameValid,
  parseGames,
} from './utils'
import { getInput } from 'helpers/index'

const inputs = getInput(import.meta.dir)

const games = parseGames(inputs)

const validGamesIds = games
  .map((game) => {
    const isValid = isGameValid(game)

    return isValid ? game.id : null
  })
  .filter(Boolean)

const powerValues = games.map(getNumberOfCubes).map(getPowerOfRound)

console.info(
  '[DAY 002 // PART 001]',
  'Summarization of valid games',
  validGamesIds.reduce((acc, curr) => acc + curr, 0)
)

console.info(
  '[DAY 002 // PART 002]',
  'Summarization of power values',
  powerValues.reduce((acc, curr) => acc + curr, 0)
)
