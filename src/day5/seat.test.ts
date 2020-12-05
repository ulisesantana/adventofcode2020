import { Seat } from './seat'

describe('SeatParser should', () => {
  it('compute row', () => {
    expect(new Seat('FBFBBFFRLR').row).toBe(44)
    expect(new Seat('BFFFBBFRRR').row).toBe(70)
    expect(new Seat('FFFBBBFRRR').row).toBe(14)
    expect(new Seat('BBFFBBFRLL').row).toBe(102)
  })
  it('compute column', () => {
    expect(new Seat('FBFBBFFRLR').column).toBe(5)
    expect(new Seat('BFFFBBFRRR').column).toBe(7)
    expect(new Seat('FFFBBBFRRR').column).toBe(7)
    expect(new Seat('BBFFBBFRLL').column).toBe(4)
  })
  it('compute unique ID', () => {
    expect(new Seat('FBFBBFFRLR').id).toBe(357)
    expect(new Seat('BFFFBBFRRR').id).toBe(567)
    expect(new Seat('FFFBBBFRRR').id).toBe(119)
    expect(new Seat('BBFFBBFRLL').id).toBe(820)
  })
})
