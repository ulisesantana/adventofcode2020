import {
  processExpensesForTwoEntries,
  processExpensesForThreeEntries
} from './expenseReport'

describe('Expenses report should', () => {
  it('find the two entries that sum to 2020 and multiply them together', () => {
    const expenses = [1721, 979, 366, 299, 675, 1456]

    expect(processExpensesForTwoEntries(expenses)).toBe(514579)
  })

  it('find the three entries that sum to 2020 and multiply them together', () => {
    const expenses = [1721, 979, 366, 299, 675, 1456]

    expect(processExpensesForThreeEntries(expenses)).toBe(241861950)
  })
})
