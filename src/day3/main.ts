import { readFile } from '../utils'
import { TrajectoryComputer } from './trajectoryComputer'

async function run (): Promise<void> {
  const map = await readFile('src/day3/input.txt')
  const tc = new TrajectoryComputer(map)
  const start = Date.now()

  console.log(tc.toString())
  console.log(
    `The amount of trees starting at the top-left corner of the map and following a slope of right 3 and down 1 is ${
        tc.exec().amountOfTreesInTrajectory()
    }`
  )
  console.log(
      `The amount of trees for all slopes multiplied among them is ${
          [
            new TrajectoryComputer(map.toString()).exec().amountOfTreesInTrajectory(),
            new TrajectoryComputer(map.toString(), 1).exec().amountOfTreesInTrajectory(),
            new TrajectoryComputer(map.toString(), 5).exec().amountOfTreesInTrajectory(),
            new TrajectoryComputer(map.toString(), 7).exec().amountOfTreesInTrajectory(),
            new TrajectoryComputer(map.toString(), 1, 2).exec().amountOfTreesInTrajectory()
          ].reduce((total, amountOfTrees) => total * amountOfTrees)
      }`
  )
  console.log(`Elapsed time: ${Date.now() - start} ms.`)
}

run().catch(console.error)
