import { chunk } from 'helpers/index'

export const parseData = (lines: string[]) => {
  const sheets = lines.map((line) => {
    const [, sheet] = line.split(':').map((x) => x.trim())
    return sheet.split(/\s{1,}/gi).map(Number)
  })

  return sheets[0].map((num, index) => {
    return [num, sheets[1][index]]
  })
}

export const toEntries = (lines: string[]) => {
  const data = chunk(lines, 2)
  return data.map(parseData)[0]
}

export const calculateAnswer = (entries: number[][]) => {
  const ranges: number[][] = []

  let answer: number[] = []

  for (const entry of entries) {
    const distance = entry[1]
    const time = entry[0]

    let speeds: number = 0

    for (let i = 1; i <= time; i++) {
      let speed = i
      let timeToTravel = time - i
      let potentialDistance = speed * timeToTravel

      if (potentialDistance > distance) {
        speeds += 1
      }
    }

    answer.push(speeds)
  }

  return answer.reduce((a, b) => a * b, 1)
}

export const turnIntoOneRace = (entries: number[][]) => {
  let race = entries
    .reduce(
      (a, b) => {
        return [`${a[0]}${b[0]}`, `${a[1]}${b[1]}`]
      },
      ['', '']
    )
    .map(Number)

  return [race]
}
