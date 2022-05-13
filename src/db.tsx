import { getDay } from "./utils"

const d1 = getDay(new Date())
const d2 = d1 + 1000 * 60 * 60 * 24
const d3 = d1 + (1000 * 60 * 60 * 24) * 2
const d4 = d1 + (1000 * 60 * 60 * 24) * 3
const d5 = d1 + (1000 * 60 * 60 * 24) * 4
export const peopleDefault = [
  { name: "São", holidays: [d1], selected: true, holidayCount: 0 },
  { name: "Luis", holidays: [d1, d2], selected: true, holidayCount: 3 },
  { name: "Paulo", holidays: [d1, d2, d4], selected: true, holidayCount: 1 },
  { name: "José", holidays: [d1, d2, d4], selected: true, holidayCount: 0 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3], selected: true, holidayCount: 2 },
  { name: "Manel", holidays: [d2, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3, d5, d3], selected: true, holidayCount: 2 },
]