import { readFile } from '../utils'
import { PassportFileValidator } from './passportFileValidator'

async function run (): Promise<void> {
  const passportsFile = await readFile('src/day4/input.txt')
  const validator = new PassportFileValidator(passportsFile)
  const start = Date.now()

  console.log(
        `The amount of valid passports is ${
            validator.exec().validPassports().length
        }`
  )
  console.log(`Elapsed time: ${Date.now() - start} ms.`)
}

run().catch(console.error)
