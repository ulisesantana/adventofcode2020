import {
  countValidPasswords,
  countValidPasswordsBasedOnPosition
} from './countValidPasswords'

describe('countValidPasswords should', () => {
  it('count the number of valid passwords based on number of times the required letter appears in the password', () => {
    const passwordsWithPolicy = [
      '1-3 a: abcde',
      '1-3 b: cdefg',
      '2-9 c: ccccccccc'
    ]

    expect(countValidPasswords(passwordsWithPolicy)).toBe(2)
  })
})

describe('countValidPasswordsBasedOnPosition should', () => {
  it('count the number of valid passwords based on the position of the required letter', () => {
    const passwordsWithPolicy = [
      '1-3 a: abcde',
      '1-3 b: cdefg',
      '2-9 c: ccccccccc',
      '2-9 c: caccccccc'
    ]

    expect(countValidPasswordsBasedOnPosition(passwordsWithPolicy)).toBe(2)
  })
})
