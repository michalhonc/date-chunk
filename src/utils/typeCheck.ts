export function isDate(date: unknown): boolean {
  return date instanceof Date
}

export function isNumber(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Number]'
}
