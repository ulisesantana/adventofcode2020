export class AnswerCounter {
  #totalCount = 0

  constructor (answers: string) {
    for (const group of answers.split('\n\n')) {
      this.countAnswers(group)
    }
  }

  get totalCount (): number {
    return this.#totalCount
  }

  private countAnswers (answers: string): void {
    const sanitizedAnswersByGroup = answers.split(/\s/g).filter(Boolean).join('\n')
    const accumulatedAnswers: string[] = this.accumulateAnswersFromGroup(sanitizedAnswersByGroup)

    for (const answer of accumulatedAnswers) {
      if (this.isAnswerSharedByGroup(answer, sanitizedAnswersByGroup)) {
        this.#totalCount += 1
      }
    }
  }

  private isAnswerSharedByGroup (answer: string, groupAnswers: string): boolean {
    return groupAnswers.split('\n').every(personAnswer => {
      return personAnswer.includes(answer)
    })
  }

  private accumulateAnswersFromGroup (answersByGroup: string): string[] {
    return [...answersByGroup].reduce<string[]>((acc, answer) => {
      const isValidAnswer = Boolean(answer.trim())
      if (isValidAnswer && !acc.includes(answer)) {
        return [...acc, answer]
      } else {
        return acc
      }
    }, [])
  }
}
