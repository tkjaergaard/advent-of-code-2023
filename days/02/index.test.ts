import { describe, expect, test } from 'bun:test'
import {
  getNumberOfCubes,
  getPowerOfRound,
  isGameValid,
  parseGames,
} from './utils'
import { getInput } from 'helpers/index'

const inputs = getInput(import.meta.dir)
const exampleInput = getInput(import.meta.dir, 'example.txt')

describe('day 002', () => {
  test('It should split the games into correct format', () => {
    const games = parseGames(exampleInput)
    expect(games.length).toBe(5)

    for (let i = 1; i <= 5; i++) {
      expect(games[i - 1].id).toBe(i)
    }

    expect(games[0].rounds.length).toBe(3)
    expect(games[1].rounds.length).toBe(3)
    expect(games[2].rounds.length).toBe(3)
    expect(games[3].rounds.length).toBe(3)
    expect(games[4].rounds.length).toBe(2)
  })

  test('It determine if a game is valid', () => {
    const games = parseGames(exampleInput)
    expect(isGameValid(games[0])).toBe(true)
    expect(isGameValid(games[1])).toBe(true)
    expect(isGameValid(games[2])).toBe(false)
    expect(isGameValid(games[3])).toBe(false)
    expect(isGameValid(games[4])).toBe(true)
  })

  test('It should determine the fewest number of cubes necessary', () => {
    const games = parseGames(exampleInput)

    expect(getNumberOfCubes(games[0])).toMatchObject({
      red: 4,
      green: 2,
      blue: 6,
    })

    expect(getNumberOfCubes(games[1])).toMatchObject({
      red: 1,
      green: 3,
      blue: 4,
    })

    expect(getNumberOfCubes(games[2])).toMatchObject({
      red: 20,
      green: 13,
      blue: 6,
    })

    expect(getNumberOfCubes(games[3])).toMatchObject({
      red: 14,
      green: 3,
      blue: 15,
    })

    expect(getNumberOfCubes(games[4])).toMatchObject({
      red: 6,
      green: 3,
      blue: 2,
    })
  })

  test('It should calculate the right power of a cube combination', () => {
    const games = parseGames(exampleInput)

    expect(getPowerOfRound(getNumberOfCubes(games[0]))).toBe(48)
    expect(getPowerOfRound(getNumberOfCubes(games[1]))).toBe(12)
    expect(getPowerOfRound(getNumberOfCubes(games[2]))).toBe(1560)
    expect(getPowerOfRound(getNumberOfCubes(games[3]))).toBe(630)
    expect(getPowerOfRound(getNumberOfCubes(games[4]))).toBe(36)
  })

  test('Part 1 should give the right score', () => {
    const games = parseGames(inputs)

    const validGamesIds = games
      .map((game) => {
        const isValid = isGameValid(game)

        return isValid ? game.id : null
      })
      .filter(Boolean)

    expect(validGamesIds.reduce((acc, curr) => acc + curr, 0)).toBe(2512)
  })

  test('Part 2 should give the right score', () => {
    const games = parseGames(inputs)
    const powerValues = games.map(getNumberOfCubes).map(getPowerOfRound)

    expect(powerValues.reduce((acc, curr) => acc + curr, 0)).toBe(67335)
  })
})
