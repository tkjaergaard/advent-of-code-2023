export class Card {
  constructor(
    public readonly id: number,
    private readonly winningNumbers: number[],
    private readonly cardNumbers: number[]
  ) {}

  get pointableNumbers() {
    return this.cardNumbers
      .map((number) => {
        return this.winningNumbers.includes(number) ? number : 0
      })
      .filter(Boolean)
  }

  get copies() {
    if (this.pointableNumbers.length === 0) {
      return []
    }

    return new Array(this.pointableNumbers.length).fill(0).map((_, index) => {
      return this.id + (index + 1)
    })
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
  let iteratableList = [...cards]
  let i = 0

  while (true) {
    const card = iteratableList[i]

    if (!card) {
      break
    }

    if (card.copies.length) {
      card.copies.forEach((id) => {
        const copy = cards.find((card) => card.id == id)

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
