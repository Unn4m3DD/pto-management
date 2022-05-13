import { getDay } from "./utils"

const d1 = getDay(new Date())
const d2 = d1 + 1000 * 60 * 60 * 24
const d3 = d1 + (1000 * 60 * 60 * 24) * 2
const d4 = d1 + (1000 * 60 * 60 * 24) * 3
const d5 = d1 + (1000 * 60 * 60 * 24) * 4
export const peopleDefault = [
  { name: "Adrienne Bright", holidays: [d1], selected: true, holidayCount: 0 },
  { name: "Alessia Randall", holidays: [d1, d2], selected: true, holidayCount: 3 },
  { name: "Javier Buchanan", holidays: [d1, d2, d4], selected: true, holidayCount: 1 },
  { name: "Philip Bryant", holidays: [d1, d2, d4], selected: true, holidayCount: 0 },
  { name: "Karla Alexander", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Hibba Suarez", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Amman Hilton", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Georgina Morris", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Kiri Storey", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Charlton Brooks", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Collette Zimmerman", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Oliver Kaufman", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Teegan Burke", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Daanyal Kerr", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Riley-Jay Haynes", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Lori Bowman", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Cinar Ahmad", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Elif Gardiner", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Sumayya Roman", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Ava-Grace Pace", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Laiba Ali", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Anoushka Hopper", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Sheridan Holding", holidays: [d2, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3], selected: true, holidayCount: 2 },
]
