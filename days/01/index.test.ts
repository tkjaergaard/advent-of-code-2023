import { describe, expect, test } from 'bun:test'
import { decryptCalibrationValue, decryptNumberWords } from './utils'
import { getInput } from 'helpers/index'

const inputs = getInput(import.meta.dir)

describe('Advent of Code 2023', () => {
  test('It should find the calibration value', () => {
    expect(decryptCalibrationValue('1abc2')).toBe(12)
    expect(decryptCalibrationValue('pqr3stu8vwx')).toBe(38)
    expect(decryptCalibrationValue('a1b2c3d4e5f')).toBe(15)
    expect(decryptCalibrationValue('treb7uchet')).toBe(77)
  })

  test('It should take spelled numbers into account', () => {
    const decrypt = (val: string) =>
      decryptCalibrationValue(decryptNumberWords(val))

    expect(decrypt('two1nine')).toBe(29)
    expect(decrypt('eightwothree')).toBe(83)
    expect(decrypt('abcone2threexyz')).toBe(13)
    expect(decrypt('xtwone3four')).toBe(24)

    expect(decrypt('4nineeightseven2')).toBe(42)
    expect(decrypt('zoneight234')).toBe(14)
    expect(decrypt('7pqrstsixteen')).toBe(76)
    expect(decrypt('5ljsxqjdxr91')).toBe(51)
  })

  test('The sum of part 1', () => {
    const claibrationValues = inputs.map(decryptCalibrationValue)
    const sum = claibrationValues.reduce((acc, curr) => acc + curr, 0)

    expect(sum).toBe(54338)
  })

  test('The sum of part 2', () => {
    const claibrationValues = inputs
      .map(decryptNumberWords)
      .map(decryptCalibrationValue)

    const sum = claibrationValues.reduce((acc, curr) => acc + curr, 0)

    expect(sum).toBe(53389)
  })
})
