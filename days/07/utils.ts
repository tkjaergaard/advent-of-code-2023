import { sum } from 'helpers/index'

export const ranksWithoutJoker = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'Q',
  'K',
  'A',
]

export const scoreRanksWithJoker = [
  'J',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'Q',
  'K',
  'A',
]

export const ranks = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
]

export const compareHands = (ranks: string[]) => {
  return function (a: Array<number | string[]>, b: Array<number | string[]>) {
    const strengthA = a[1] as number
    const strengthB = b[1] as number

    if (strengthA !== strengthB) {
      return strengthB - strengthA
    }

    const deckA = a[0] as string[]
    const deckB = b[0] as string[]

    for (let i = 0; i < deckA.length; i++) {
      if (deckA[i] !== deckB[i]) {
        return ranks.indexOf(deckA[i]) > ranks.indexOf(deckB[i]) ? 1 : -1
      }
    }

    return 0
  }
}

export const calculateTotalSum = (
  lines: string[],
  useJokers: boolean = false
) => {
  const _scoreRank = useJokers ? scoreRanksWithJoker : ranks

  const hands = lines.map((line) => {
    const [cards, bid] = line.split(' ')

    return {
      deck: cards.split(''),
      bid: Number(bid),
    }
  })

  const method = useJokers ? calcHandsWithJokers : calcHands

  const scores = method(hands).sort((a: any, b: any) => a[1] - b[1])

  return sum(
    scores
      .sort(compareHands(_scoreRank))
      .map((hand) => hand[2] as number)
      .map((bid: number, index: number) => {
        return bid * (index + 1)
      })
  )
}

export const calcHands = (hands: { bid: number; deck: string[] }[]) => {
  return hands.map(({ bid, deck }) => {
    // Check if there is five of any kind in the deck array
    if (deck.filter((card) => card === deck[0]).length === 5) {
      return [deck, 0, bid]
    }

    const pairs: number[] = []

    for (let i = deck.length - 1; i >= 0; i--) {
      const card = deck[i]
      const index = ranks.indexOf(card)

      if (!pairs?.[index]) {
        pairs[index] = 0
      }

      pairs[index] += 1
    }

    // Four of a kind
    if (pairs.find((pair) => pair == 4)) {
      return [deck, 1, bid]
    }

    // Full house
    if (pairs.find((pair) => pair == 3) && pairs.find((pair) => pair == 2)) {
      return [deck, 2, bid]
    }

    // Three of a kind
    if (pairs.find((pair) => pair == 3)) {
      return [deck, 3, bid]
    }

    // Two pairs
    if (pairs.filter((pair) => pair === 2).length === 2) {
      return [deck, 4, bid]
    }

    // One pair
    if (pairs.filter((pair) => pair === 2).length > 0) {
      return [deck, 5, bid]
    }

    return [deck, 6, bid]
  })
}

export const calcHandsWithJokers = (
  hands: { bid: number; deck: string[] }[]
) => {
  return hands.map(({ bid, deck: _deck }) => {
    const pairs: number[] = []
    const jokers = _deck.filter((card) => card === 'J').length
    const deck = _deck.filter((card) => card !== 'J')

    for (let i = deck.length - 1; i >= 0; i--) {
      const card = deck[i]
      const index = ranksWithoutJoker.indexOf(card)

      if (!pairs?.[index]) {
        pairs[index] = 0
      }

      pairs[index] += 1
    }

    // Five of a kind
    if (Math.max(...pairs.filter(Boolean), 0) + jokers === 5) {
      return [_deck, 0, bid]
    }

    // Four of a kind
    if (pairs.find((pair) => pair + jokers >= 4)) {
      return [_deck, 1, bid]
    }

    // Full house
    if (
      (pairs.filter((pair) => pair == 2).length == 2 && jokers) ||
      (pairs.find((pair) => pair == 3) && pairs.find((pair) => pair == 2))
    ) {
      return [_deck, 2, bid]
    }

    // Three of a kind
    if (
      pairs.find((pair) => pair == 3) ||
      Math.max(...pairs.filter(Boolean)) + jokers === 3
    ) {
      return [_deck, 3, bid]
    }

    // Two pairs
    if (pairs.filter((pair) => pair === 2).length === 2) {
      return [_deck, 4, bid]
    }

    // One pair
    if (
      pairs.filter((pair) => pair === 2).length > 0 ||
      Math.max(...pairs.filter(Boolean)) + jokers === 2
    ) {
      return [_deck, 5, bid]
    }

    return [_deck, 6, bid]
  })
}
