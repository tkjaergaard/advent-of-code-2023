import fs from 'fs'
import path from 'path'
import { decryptNumberWords, decryptCalibrationValue } from './utils'

const inputs = fs
  .readFileSync(path.resolve(import.meta.dir, 'input.txt'), 'utf8')
  .split('\n')

const values_001 = inputs.map(decryptCalibrationValue)
const sum_001 = values_001.reduce((acc, curr) => acc + curr, 0)

const values_002 = inputs.map(decryptNumberWords).map(decryptCalibrationValue)

const sum_002 = values_002.reduce((acc, curr) => acc + curr, 0)

console.info('[PART 001]', 'Summarization of calibration values', sum_001)
console.info('[PART 002]', 'Summarization of calibration values', sum_002)
