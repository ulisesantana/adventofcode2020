import { PassportFileValidator } from './passportFileValidator'
import { readFile } from '../utils'

describe('PassportValidator should', () => {
  it('require all fields except cid (Country ID)', async () => {
    const passports = await readFile('src/day4/fixtures/required-fields.txt')
    const validator = new PassportFileValidator(passports)

    validator.exec()

    expect(validator.validPassports().length).toBe(2)
  })

  it('validate birth date is between 1920 and 2002', async () => {
    const passports = await readFile('src/day4/fixtures/valid-birth-year.txt')
    const validator = new PassportFileValidator(passports)

    validator.exec()

    expect(validator.validPassports().length).toBe(3)
  })

  it('validate issue date is between 2010 and 2020', async () => {
    const passports = await readFile('src/day4/fixtures/valid-issue-year.txt')
    const validator = new PassportFileValidator(passports)

    validator.exec()

    expect(validator.validPassports().length).toBe(3)
  })

  it('validate expiration date is between 2020 and 2030', async () => {
    const passports = await readFile('src/day4/fixtures/valid-expiration-year.txt')
    const validator = new PassportFileValidator(passports)

    validator.exec()

    expect(validator.validPassports().length).toBe(3)
  })

  it('validate height in cm is between 150 and 193', async () => {
    const passports = await readFile('src/day4/fixtures/valid-height-in-cm-year.txt')
    const validator = new PassportFileValidator(passports)

    validator.exec()

    expect(validator.validPassports().length).toBe(3)
  })

  it('validate height in inches is between 59 and 77', async () => {
    const passports = await readFile('src/day4/fixtures/valid-height-in-inches-year.txt')
    const validator = new PassportFileValidator(passports)

    validator.exec()

    expect(validator.validPassports().length).toBe(3)
  })

  it('validate hair colors is a # followed by exactly six characters 0-9 or a-f', async () => {
    const passports = await readFile('src/day4/fixtures/valid-hair-color.txt')
    const validator = new PassportFileValidator(passports)

    validator.exec()

    expect(validator.validPassports().length).toBe(2)
  })

  it('validate eye colors is one of: amb, blu, brn, gry, grn, hzl or oth', async () => {
    const passports = await readFile('src/day4/fixtures/valid-eye-color.txt')
    const validator = new PassportFileValidator(passports)

    validator.exec()

    expect(validator.validPassports().length).toBe(7)
  })

  it('validate passport ID is a nine-digit number, including leading zeroes', async () => {
    const passports = await readFile('src/day4/fixtures/valid-passport-id.txt')
    const validator = new PassportFileValidator(passports)

    validator.exec()

    expect(validator.validPassports().length).toBe(2)
  })
})
