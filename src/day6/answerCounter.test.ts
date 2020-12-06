import { AnswerCounter } from './answerCounter'

describe('AnswerCounter should', () => {
  it('count different answers from a single person', () => {
    expect(new AnswerCounter('abcx').totalCount).toBe(4)
  })
  it('count shared answers from a single group', () => {
    const answers1 = `
a
b
c`
    const answers2 = `
ab
ac`

    expect(new AnswerCounter(answers1).totalCount).toBe(0)
    expect(new AnswerCounter(answers2).totalCount).toBe(1)
  })
  it('count shared answers from multiple groups', () => {
    const answers = `
abc

a
b
c

ab
ac

a
a
a
a

b`
    expect(new AnswerCounter(answers).totalCount).toBe(6)
  })
})
