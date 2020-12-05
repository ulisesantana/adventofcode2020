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
  const [seatNextToMissingSeat] = boardingPassList
    .sort(sortNumberAsc)
    .filter(filterNoCorrelativeSeats)
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
  const isAVeryFrontSeat = index <= 10
  const isAVeryBackSeat = index <= allSeatIds.length - 10

  if (previousSeatId !== undefined && !(isAVeryBackSeat && isAVeryFrontSeat)) {
    return seatId - previousSeatId > 1
  } else {
    return false
  }
}

run().catch(console.error)
