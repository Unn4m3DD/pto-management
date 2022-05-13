
export function getDay(date: Date): number {
  let result = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  return result.getTime();
}