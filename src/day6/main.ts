import { readFile } from '../utils'
import { AnswerCounter } from './answerCounter'

async function run (): Promise<void> {
  const start = Date.now()
  const answers = await readFile('src/day6/input.txt')

  console.log(`The total amount of "yes" answers is ${new AnswerCounter(answers).totalCount}`)
  console.log(`Elapsed time: ${Date.now() - start} ms.`)
}

run().catch(console.error)
