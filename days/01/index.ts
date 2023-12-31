import { decryptNumberWords, decryptCalibrationValue } from './utils'
import { getInput, sum } from 'helpers/index'

const inputs = getInput(import.meta.dir)

const values_001 = inputs.map(decryptCalibrationValue)
const sum_001 = sum(values_001)

const values_002 = inputs.map(decryptNumberWords).map(decryptCalibrationValue)

const sum_002 = sum(values_002)

console.info(
  '[DAY 001 // PART 001]',
  'Summarization of calibration values',
  sum_001
)
console.info(
  '[DAY 001 // PART 002]',
  'Summarization of calibration values',
  sum_002
)
