import expenses from './input.json'

export function processExpensesForTwoEntries(expenses: number[]): number {
  for (const expenseA of expenses) {
    const expenseB = expenses.find(
      (expenseB: number) => expenseA + expenseB === 2020
    )
    if (expenseB !== undefined) {
      return expenseA * expenseB
    }
  }
  return -1
}

export function processExpensesForThreeEntries(expenses: number[]): number {
  for (const expenseA of expenses) {
    for (const expenseB of expenses) {
      const expenseC = expenses.find(
        (expenseC: number) => expenseA + expenseB + expenseC === 2020
      )
      if (expenseC !== undefined) {
        return expenseA * expenseB * expenseC
      }
    }
  }
  return -1
}

if (require.main === module) {
  const start = Date.now()
  console.log(
    `The result of the expenses report for 2 entries is ${processExpensesForTwoEntries(
      expenses
    )}`
  )
  console.log(
    `The result of the expenses report for 3 entries is ${processExpensesForThreeEntries(
      expenses
    )}`
  )
  console.log(`Elapsed time: ${Date.now() - start} ms.`)
}
