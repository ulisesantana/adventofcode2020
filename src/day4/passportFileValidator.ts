export class PassportFileValidator {
  private readonly passports: PassportValidator[]
  constructor (passportsFile: string) {
    this.passports = this.extractPassportsFromFile(passportsFile)
  }

  exec (): PassportFileValidator {
    return this
  }

  validPassports (): PassportValidator[] {
    return this.passports.filter(passport => passport.isValid())
  }

  private extractPassportsFromFile (passportsFile: string): PassportValidator[] {
    return passportsFile.split('\n\n').map(passport => new PassportValidator(passport))
  }
}

interface Passport {
  byr: string // Birth Year
  iyr: string // Issue Year
  eyr: string // Expiration Year
  hgt: string // Height
  hcl: string // Hair Color
  ecl: string // Eye Color
  pid: string // Passport ID
  cid?: string // Country ID
}

class PassportValidator {
  readonly #value: Passport
  readonly #emptyPassport: Passport = {
    byr: '',
    iyr: '',
    eyr: '',
    hgt: '',
    hcl: '',
    ecl: '',
    pid: '',
    cid: ''
  }

  readonly #validEyeColors = [
    'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'
  ]

  constructor (passport: string) {
    this.#value = this.parsePassport(passport)
  }

  valueOf (): Passport {
    return this.#value
  }

  isValid (): boolean {
    return Object.entries(this.#value).every(([key, value]) => key === 'cid' || Boolean(value)) &&
        this.validateBirthDate() &&
        this.validateIssueDate() &&
        this.validateExpirationDate() &&
        this.validateHeight() &&
        this.validateHairColor() &&
        this.validateEyeColor() &&
        this.validatePassportId()
  }

  private validateBirthDate (): boolean {
    return +this.#value.byr >= 1920 && +this.#value.byr <= 2002
  }

  private validateIssueDate (): boolean {
    return +this.#value.iyr >= 2010 && +this.#value.iyr <= 2020
  }

  private validateExpirationDate (): boolean {
    return +this.#value.eyr >= 2020 && +this.#value.eyr <= 2030
  }

  private validateHeight (): boolean {
    const [height, measure] = this.#value.hgt.split(/(cm|in)/g)
    if (measure === 'cm') {
      return +height >= 150 && +height <= 193
    }
    if (measure === 'in') {
      return +height >= 59 && +height <= 76
    }

    return false
  }

  private validateHairColor (): boolean {
    return this.#value.hcl.length === 7 && /^#[0-9|a-f]{6}/.test(this.#value.hcl)
  }

  private validateEyeColor (): boolean {
    return this.#validEyeColors.includes(this.#value.ecl)
  }

  private validatePassportId (): boolean {
    return this.#value.pid.length === 9 && /\d{9}/.test(this.#value.pid)
  }

  private parsePassport (rawPassport: string): Passport {
    return rawPassport.split(/\s/gi).reduce((passport, field) => {
      const [key, value] = field.split(':')
      return {
        ...passport,
        [key]: String(value)
      }
    }, this.#emptyPassport)
  }
}
