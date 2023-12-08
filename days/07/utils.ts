import { sum } from 'helpers/index'

export const ranks = [
  '0',
  ...Array(8)
    .fill(0)
    .map((_, index) => `${index + 2}`),
  ...['B', 'C', 'D', 'E', 'F'],
]

export const replacementMap: Record<string, string> = {
  T: 'B',
  J: 'C',
  Q: 'D',
  K: 'E',
  A: 'F',
}

export const calculateTotalSum = (
  lines: string[],
  useJokers: boolean = false
) => {
  const hands = lines.map((line) => {
    const [cards, bid] = line.split(' ')

    return {
      deck: cards
        .split('')
        .map((char) => (useJokers && char === 'J' ? '0' : char))
        .map((char) => replacementMap[char] || char),
      bid: Number(bid),
    }
  })

  const scores = calcHandsWithJokers(hands)
    .sort((a, b) => a.deck.localeCompare(b.deck))
    .sort((a, b) => b.strength - a.strength)

  return sum(
    scores.map((hand, index) => {
      return hand.bid * (index + 1)
    })
  )
}

export const calcHandsWithJokers = (
  hands: { bid: number; deck: string[] }[]
) => {
  return hands.map(({ bid, deck: _deck }) => {
    const pairs: number[] = []
    const jokers = _deck.filter((card) => card === '0').length
    const deck = _deck.filter((card) => card !== '0')

    for (let i = deck.length - 1; i >= 0; i--) {
      const card = deck[i]
      const index = ranks.indexOf(`${card}`)

      if (!pairs?.[index]) {
        pairs[index] = 0
      }

      pairs[index] += 1
    }

    const counts: number[] = pairs
      .filter(Boolean)
      .sort((a: any, b: any) => b - a) as number[]

    if (!counts.length) {
      counts[0] = 0
    }

    counts[0] += jokers

    const matrix = counts.join(',')

    // Five of a kind
    if (matrix == '5') {
      return {
        deck: _deck.join(''),
        strength: 0,
        bid,
      }
    }

    // Four of a kind
    if (matrix === '4,1') {
      return {
        deck: _deck.join(''),
        strength: 1,
        bid,
      }
    }

    // Full house
    if (matrix == '3,2') {
      return {
        deck: _deck.join(''),
        strength: 2,
        bid,
      }
    }

    // Three of a kind
    if (matrix == '3,1,1') {
      return {
        deck: _deck.join(''),
        strength: 3,
        bid,
      }
    }

    // Two pairs
    if (matrix == '2,2,1') {
      return {
        deck: _deck.join(''),
        strength: 4,
        bid,
      }
    }

    // One pair
    if (matrix == '2,1,1,1') {
      return {
        deck: _deck.join(''),
        strength: 5,
        bid,
      }
    }

    return {
      deck: _deck.join(''),
      strength: 6,
      bid,
    }
  })
}
