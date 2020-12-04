import * as fs from 'fs/promises'
import * as path from 'path'
import { TrajectoryComputer } from './trajectoryComputer'

describe('Trajectory computer should count the number of trees starting at the top-left corner of the map and following a slope of', () => {
  it('right 3 and down 1', async () => {
    const map = await fs.readFile(path.resolve('src/day3/input.test.txt'))
    const tc = new TrajectoryComputer(map.toString())

    expect(tc.exec().amountOfTreesInTrajectory()).toBe(7)
  })
  it('right 1 and down 1', async () => {
    const map = await fs.readFile(path.resolve('src/day3/input.test.txt'))
    const tc = new TrajectoryComputer(map.toString(), 1)

    expect(tc.exec().amountOfTreesInTrajectory()).toBe(2)
  })
  it('right 5 and down 1', async () => {
    const map = await fs.readFile(path.resolve('src/day3/input.test.txt'))
    const tc = new TrajectoryComputer(map.toString(), 5)

    expect(tc.exec().amountOfTreesInTrajectory()).toBe(3)
  })
  it('right 7 and down 1', async () => {
    const map = await fs.readFile(path.resolve('src/day3/input.test.txt'))
    const tc = new TrajectoryComputer(map.toString(), 7)

    expect(tc.exec().amountOfTreesInTrajectory()).toBe(4)
  })
  it('right 1 and down 2', async () => {
    const map = await fs.readFile(path.resolve('src/day3/input.test.txt'))
    const tc = new TrajectoryComputer(map.toString(), 1, 2)

    expect(tc.exec().amountOfTreesInTrajectory()).toBe(2)
  })
})
