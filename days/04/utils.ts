export class Card {
  protected _pointableNumbers: number[] | null = null
  protected _copies: number[] | null = null

  constructor(
    public readonly id: number,
    private readonly winningNumbers: number[],
    private readonly cardNumbers: number[]
  ) {}

  get pointableNumbers() {
    if (!this._pointableNumbers) {
      this._pointableNumbers = this.cardNumbers
        .map((number) => {
          return this.winningNumbers.includes(number) ? number : 0
        })
        .filter(Boolean)
    }

    return this._pointableNumbers
  }

  get copies() {
    if (!this._copies) {
      if (this.pointableNumbers.length === 0) {
        return []
      }

      return new Array(this.pointableNumbers.length).fill(0).map((_, index) => {
        return this.id + (index + 1)
      })
    }

    return this._copies
  }

  get points() {
    if (this.pointableNumbers.length === 0) {
      return 0
    }

    const iterations = this.pointableNumbers.length - 1
    let points = 1

    for (let i = 0; i < iterations; i++) {
      points *= 2
    }

    return points
  }
}

export const getTotalNumberOfCards = (cards: Card[]) => {
  const map = Object.fromEntries(cards.map((card) => [card.id, card]))

  let iteratableList = [...cards]
  let i = 0

  while (true) {
    const card = iteratableList[i]

    if (!card) {
      break
    }

    if (card.copies.length) {
      card.copies.forEach((id) => {
        const copy = map?.[id]

        if (copy) {
          iteratableList.push(copy)
        }
      })
    }

    i++
  }

  return iteratableList.length
}

export const parseCards = (lines: string[]) => {
  return lines.map((line) => {
    const [id, winningNumbers, cardNumbers] = line.split(/\:|\|/gi)

    return new Card(
      Number(id.replace(/[^\d]/gi, '')),
      winningNumbers.trim().split(' ').map(Number).filter(Boolean),
      cardNumbers.trim().split(' ').map(Number).filter(Boolean)
    )
  })
}
