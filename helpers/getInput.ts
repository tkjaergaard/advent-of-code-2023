import fs from 'fs'
import path from 'path'

export const getInput = (dir: string, filename: string = 'input.txt') => {
  return fs.readFileSync(path.resolve(dir, filename), 'utf8').split('\n')
}
