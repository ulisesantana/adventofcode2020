import passwordsWithPolicy from './input.json'

if (require.main === module) {
  const start = Date.now()
  console.log(
    `The amount of valid passwords is based on amount of letters is ${countValidPasswords(
      passwordsWithPolicy
    )}`
  )
  console.log(
    `The amount of valid passwords is based on letter position is ${countValidPasswordsBasedOnPosition(
      passwordsWithPolicy
    )}`
  )
  console.log(`Elapsed time: ${Date.now() - start} ms.`)
}

export function countValidPasswords (passwords: string[]): number {
  return passwords.reduce((totalValidPasswords, passwordHash) => {
    if (isPasswordValidBasedOnAmountOfLetters(passwordHash)) {
      return totalValidPasswords + 1
    } else {
      return totalValidPasswords
    }
  }, 0)
}

export function countValidPasswordsBasedOnPosition (passwords: string[]): number {
  return passwords.reduce((totalValidPasswords, passwordHash) => {
    if (isPasswordValidBasedOnLettersPosition(passwordHash)) {
      return totalValidPasswords + 1
    } else {
      return totalValidPasswords
    }
  }, 0)
}

function isPasswordValidBasedOnAmountOfLetters (passwordHash: string): boolean {
  const [policy, letterWithSeparator, password] = passwordHash.split(' ')
  const [letter] = letterWithSeparator.split(':')
  const [min, max] = policy.split('-')
  const amountOfLettersInPassword = countLetters(letter, password)

  return (
    amountOfLettersInPassword >= Number(min) &&
    amountOfLettersInPassword <= Number(max)
  )
}

function isPasswordValidBasedOnLettersPosition (passwordHash: string): boolean {
  const [policy, letterWithSeparator, password] = passwordHash.split(' ')
  const [letter] = letterWithSeparator.split(':')
  const [position1, position2] = policy.split('-')
  const isFirstPositionValid = password[Number(position1) - 1] === letter
  const isSecondPositionValid = password[Number(position2) - 1] === letter

  if (isFirstPositionValid && isSecondPositionValid) {
    return false
  } else {
    return isFirstPositionValid || isSecondPositionValid
  }
}

function countLetters (letter: string, sentence: string): number {
  const letters = sentence.match(new RegExp(letter, 'gi'))
  return Array.isArray(letters) ? letters.length : 0
}
