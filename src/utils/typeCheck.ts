export function isDate(date: any): boolean {
  // return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
  return date instanceof Date
}

export function isNumber(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Number]'
}
