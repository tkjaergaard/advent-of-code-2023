export const numberWords = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]

export const decryptCalibrationValue = (input: string): number => {
  const numbers = input.replace(/[^\d]/gi, '')

  return Number(`${numbers[0]}${numbers.slice(-1)}`)
}

export const decryptNumberWords = (input: string): string => {
  for (const word of numberWords) {
    input = input.replaceAll(
      word,
      `${word}${numberWords.indexOf(word) + 1}${word}`
    )
  }

  return input
}
