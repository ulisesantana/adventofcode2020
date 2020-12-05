import { readFile } from '../utils'
import { Seat } from './seat'

async function run (): Promise<void> {
  const start = Date.now()
  const boardingPassFile = await readFile('src/day5/input.txt')
  const boardingPassList = boardingPassFile.split('\n').map(boardingPass => {
    const seat = new Seat(boardingPass)
    return seat.id
  })
  const highestSeatID = Math.max(...boardingPassList)
  const mySeatId = getMissingSeatId(boardingPassList)

  console.log(`The highest seat ID is ${highestSeatID}`)
  console.log(`My seat ID is ${mySeatId}`)
  console.log(`Elapsed time: ${Date.now() - start} ms.`)
}

function getMissingSeatId (boardingPassList: number[]): number {
  const seatNextToMissingSeat = boardingPassList
    .sort(sortNumberAsc)
    .filter(filterNoCorrelativeSeats)
    .find(filterFirstAndLast10Rows)
  return seatNextToMissingSeat !== undefined ? seatNextToMissingSeat - 1 : -1
}

function sortNumberAsc (a: number, b: number): number {
  if (a > b) {
    return 1
  }

  if (b > a) {
    return -1
  }

  return 0
}

function filterNoCorrelativeSeats (seatId: number, index: number, allSeatIds: number[]): boolean {
  const previousSeatId = allSeatIds[index - 1]
  if (previousSeatId !== undefined) {
    return seatId - previousSeatId > 1
  } else {
    return false
  }
}

const filterFirstAndLast10Rows = (seatId: number): boolean => seatId > 87 && seatId < 944

run().catch(console.error)
