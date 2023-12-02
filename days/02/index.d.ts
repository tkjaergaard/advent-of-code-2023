declare interface Game {
  id: number
  rounds: Round[]
}

declare interface Round {
  [key: string]: number
  red: number
  green: number
  blue: number
}
