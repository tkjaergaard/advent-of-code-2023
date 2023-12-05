import { existsSync, mkdirSync, writeFileSync } from 'fs'
import path from 'path'

const day = process.argv.pop()
const directory = path.resolve(
  import.meta.dir,
  `../days/${day?.padStart(2, '0')}`
)

// Check if directory already exists
if (existsSync(directory)) {
  console.error('Directory already exists!')
  process.exit(1)
}

// create file at directory
const fileContent = [
  "import { getInput } from 'helpers/index'",
  '',
  'const lines = getInput(import.meta.dir)',
  '',
  `console.info('[DAY ${day?.padStart(
    3,
    '0'
  )} // PART 001]', '[task]', '[ANSWER]')`,
  `console.info('[DAY ${day?.padStart(
    3,
    '0'
  )} // PART 002]', '[task]', '[ANSWER]')`,
].join('\n')

const testContent = [
  "import { describe, test, expect } from 'bun:test'",
  "import { getInput } from 'helpers/index'",
  '',
  'const inputs = getInput(import.meta.dir)',
  "const exampleInput = getInput(import.meta.dir, 'example.txt')",
  '',
  `describe('Day ${day}', () => {`,
  "  test('Part 1: Example', () => {",
  '  })',
  '',
  "  test('Part 1: Answer', () => {",
  '  })',
  '',
  "  test('Part 2: Example', () => {",
  '  })',
  '',
  "  test('Part 2: Answer', () => {",
  '  })',
  '})',
].join('\n')

const inputs = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
  headers: {
    Cookie: process.env.AOC_COOKIE as string,
  },
  credentials: 'include',
}).then((res) => res.text())

if (
  inputs.startsWith(
    "Please don't repeatedly request this endpoint before it unlocks"
  )
) {
  console.error('Not yet available!')
  process.exit(1)
}

mkdirSync(directory, {
  recursive: true,
})

writeFileSync(path.resolve(directory, 'index.ts'), fileContent)
writeFileSync(path.resolve(directory, 'utils.ts'), ``)
writeFileSync(path.resolve(directory, 'index.test.ts'), testContent)
writeFileSync(path.resolve(directory, 'input.txt'), inputs.trim())
writeFileSync(path.resolve(directory, 'example.txt'), '')
