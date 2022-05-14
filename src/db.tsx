import { getDay } from "./utils"

const d1 = getDay(new Date())
const d2 = d1 + 1000 * 60 * 60 * 24
const d3 = d1 + (1000 * 60 * 60 * 24) * 2
const d4 = d1 + (1000 * 60 * 60 * 24) * 3
const d5 = d1 + (1000 * 60 * 60 * 24) * 4
export const peopleDefault = [
  { name: "Adrienne Bright", holidays: new Set([d3]), selected: true, holidayCount: 2, color: '#' + Math.floor(Math.random() * 16777215).toString(16)},
  { name: "Alessia Randall", holidays: new Set([d3, d4]), selected: true, holidayCount: 3, color: '#' + Math.floor(Math.random() * 16777215).toString(16)},
]
