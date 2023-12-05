import { isDigit } from 'helpers/index'

export const isSymbol = (input: string) => {
  return input != '.'
}

export const getPartNumbers = (lines: string[]) => {
  const parts = parseLines(lines)

  return parts
    .map((line, lineNumber) => {
      return line.map((part) => {
        const isValid = isValidPartNumber(
          part.num,
          part.indexStart,
          part.indexEnd,
          lineNumber,
          lines
        )

        return isValid ? Number(part.num) : 0
      })
    })
    .reduce((a, b) => a.concat(b), [])
    .filter((t) => t > 0)
}

export const isValidPartNumber = (
  num: string,
  startIndex: number,
  endIndex: number,
  lineNumber: number,
  schema: string[]
) => {
  const line = schema[lineNumber]

  const precedingLine = getPartialLine(
    schema[lineNumber - 1] || '',
    startIndex,
    endIndex
  )
  const followingLine = getPartialLine(
    schema[lineNumber + 1] || '',
    startIndex,
    endIndex
  )

  const precedingChar = getCharacter(line, startIndex - 1)
  const followingChar = getCharacter(line, endIndex)

  const chars = [
    ...precedingLine,
    ...precedingChar,
    ...followingChar,
    ...followingLine,
  ].filter((t) => t != '.')

  return chars.length > 0
}

export const getPartialLine = (
  line: string,
  startIndex: number,
  endIndex: number
) => {
  return (
    line.slice(
      Math.max(0, startIndex - 1),
      Math.min(line.length, endIndex + 1)
    ) || ''
  )
}

export const getCharacter = (line: string, index: number) => {
  return line.slice(index, index + 1) || '.'
}

export const parseLines = (lines: string[]): Part[][] => {
  return lines.map((line) => {
    const matches = Array.from(line.matchAll(/(\d{1,})/gi))

    return matches.map((match) => {
      const num = match[0]

      return {
        indexStart: match.index,
        indexEnd: (match.index || 0) + num.length,
        num,
      }
    })
  })
}

export const findGears = (lines: string[]): number[] => {
  const potentialGears = lines.map((line, lineNumber) => ({
    lineNumber,
    line,
    surrondings: [lines[lineNumber - 1] || '', lines[lineNumber + 1] || ''],
  }))

  const hashMap = potentialGears
    .map((part) => {
      const matches = Array.from(part.line.matchAll(/(\*)/gi))
        .map((match) => {
          const index = match.index

          if (!index) {
            return null
          }

          const numbers: number[] = [
            ...findFloting(part.surrondings[0], index),
            part.line
              .slice(Math.max(index - 5, 0), index)
              .split(/(\d{1,})$/)?.[1] || '',
            part.line.slice(index + 1, index + 5).split(/^(\d{1,})/)?.[1] || '',
            ...findFloting(part.surrondings[1], index),
          ]
            .filter(Boolean)
            .map((c) => Number(c))

          if (numbers.length !== 2) {
            return 0
          }

          return numbers[0] * numbers[1]
        })
        .filter((t) => t !== null) as number[]

      return matches
    })
    .filter((a) => a.length)

  return hashMap.reduce((a, b) => a.concat(b), []).filter((t) => t > 0)
}

const findFloting = (line: string, index: number) => {
  let a = ''
  let b = ''
  let i = 0

  let isOneDigit = isDigit(line[index])

  let continueForward = true
  let continueBackwards = true

  let ix0 = !isDigit(line[index]) ? index - 1 : index
  let ix1 = !isDigit(line[index]) ? index + 1 : index

  while (true) {
    let x0 = line[ix0 - i]
    let x1 = line[ix1 + i]

    if (continueBackwards && isDigit(x0)) {
      a = x0 + a
    } else {
      continueBackwards = false
    }

    if (continueForward && isDigit(x1)) {
      b += x1
    } else {
      continueForward = false
    }

    if (!continueBackwards && !continueForward) {
      break
    }

    i += 1
  }

  if (isOneDigit && b) {
    a = a.slice(0, a.length - 1)
  }

  return isOneDigit ? [a + b] : [a, b]
}
