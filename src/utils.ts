import Holidays from "date-holidays";
var hd = new Holidays()
hd.init('PT')
const nationalHolidays = new Set(hd.getHolidays(2022).map(e => getDay(e.start)))

export function getDay(date: Date): number {
  let result = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  return result.getTime();
}

export function shouldDisableDate(date: Date){
  return date.getDay() === 6 || nationalHolidays.has(getDay(date))
}