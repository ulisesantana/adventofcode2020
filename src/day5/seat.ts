enum SeatPosition {
  Front = 'F',
  Back = 'B',
  Right = 'R',
  Left = 'L'
}

interface ComputePositionParams {
  lowerPositionCode: SeatPosition
  upperPositionCode: SeatPosition
  minPosition: number
  maxPosition: number
}

export class Seat {
  readonly #row: number
  readonly #column: number
  readonly #id: number
  readonly #maxRow = 127
  readonly #maxColumn = 7
  readonly #magicNumber = 8

  constructor (boardingPass: string) {
    this.#row = this.parseRow(boardingPass.substring(0, 7))
    this.#column = this.parseColumn(boardingPass.substring(7))
    this.#id = this.#row * this.#magicNumber + this.#column
  }

  get row (): number {
    return this.#row
  }

  get column (): number {
    return this.#column
  }

  get id (): number {
    return this.#id
  }

  private parseRow (code: string): number {
    return this.computeRow([...code])
  }

  private parseColumn (code: string): number {
    return this.computeColumn([...code])
  }

  private readonly computeRow = this.generateComputePosition({
    lowerPositionCode: SeatPosition.Front,
    upperPositionCode: SeatPosition.Back,
    minPosition: 0,
    maxPosition: this.#maxRow
  })

  private readonly computeColumn = this.generateComputePosition({
    lowerPositionCode: SeatPosition.Left,
    upperPositionCode: SeatPosition.Right,
    minPosition: 0,
    maxPosition: this.#maxColumn
  })

  private generateComputePosition ({ lowerPositionCode, upperPositionCode, minPosition, maxPosition }: ComputePositionParams) {
    return function computePosition ([head, ...code]: string[], [min, max] = [minPosition, maxPosition]): number {
      if (head === lowerPositionCode) {
        const newMax = min === 0
          ? Math.floor(max - max / 2)
          : min + Math.floor((max - min) / 2)
        return code.length === 0
          ? min
          : computePosition(code, [min, newMax])
      }
      if (head === upperPositionCode) {
        const newMin = Math.ceil(min + (max - min) / 2)
        return code.length === 0
          ? max
          : computePosition(code, [newMin, max])
      }
      return -1
    }
  }
}
