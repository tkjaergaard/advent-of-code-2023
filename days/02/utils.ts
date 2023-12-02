export const parseGames = (input: string): Game[] => {
  const games = input.split('\n')

  return games.map((game) => {
    const [id, rounds] = game.split(':')

    const g: Game = {
      id: Number(id.replace(/[^\d]/gi, '')),
      rounds: rounds.split(';').map((t) => {
        return Object.fromEntries(
          t
            .trim()
            .split(', ')
            .map((n) => {
              const [color, number] = n.split(' ').reverse()

              return [color, Number(number)]
            })
        ) as unknown as Round
      }),
    }

    return g
  })
}

export const isGameValid = (game: Game): boolean => {
  let isValid = true

  const maxValues: Record<string, number> = { red: 12, green: 13, blue: 14 }

  game.rounds.forEach((round) => {
    for (const key in round) {
      if (!(key in round) || round[key] > maxValues[key]) {
        isValid = false
      }
    }
  })

  return isValid
}

export const getNumberOfCubes = (game: Game): Round => {
  let green: number[] = []
  let blue: number[] = []
  let red: number[] = []

  game.rounds.forEach((round) => {
    green.push(round.green || 0)
    blue.push(round.blue || 0)
    red.push(round.red || 0)
  })

  return {
    red: Math.max(...red),
    blue: Math.max(...blue),
    green: Math.max(...green),
  }
}

export const getPowerOfRound = (round: Round): number => {
  return round.red * round.green * round.blue
}
