type Coordinates = Array<[number, number]>

export class TrajectoryComputer {
  private readonly tree = '#'
  private readonly map: string[][]
  private readonly mapWithTrajectory: string[][]
  private _amountOfTreesInTrajectory = 0

  constructor (map: string, private readonly slopeRight = 3, private readonly slopeDown = 1) {
    this.map = map.split('\n').map(row => [...row])
    this.mapWithTrajectory = map.split('\n').map(row => [...row])
  }

  exec (): TrajectoryComputer {
    for (const [row, column] of this.computeSlope()) {
      if (this.isATree(this.mapWithTrajectory[row][column])) {
        this._amountOfTreesInTrajectory += 1
        this.mapWithTrajectory[row][column] = 'X'
      } else {
        this.mapWithTrajectory[row][column] = 'O'
      }
    }

    return this
  }

  amountOfTreesInTrajectory (): number {
    return this._amountOfTreesInTrajectory
  }

  toString (): string {
    return this.mapWithTrajectory.map(row => row.join('')).join('\n')
  }

  private isATree (value: string): boolean {
    return value === this.tree
  }

  private computeSlope (
    slope = [[0, 0]] as Coordinates,
    slopeDown = 0,
    slopeRight = 0
  ): Coordinates {
    const newSlopeDown = slopeDown + this.slopeDown
    const newSlopeRight = this.computeSlopeRight(slopeRight)
    if (newSlopeDown < this.map.length) {
      return this.computeSlope([...slope, [newSlopeDown, newSlopeRight]], newSlopeDown, newSlopeRight)
    } else {
      return slope
    }
  }

  private computeSlopeRight (currentPosition: number): number {
    const newPosition = currentPosition + this.slopeRight
    if (newPosition < this.map[0].length) {
      return newPosition
    } else {
      return newPosition - this.map[0].length
    }
  }
}
