export function count(item: string, array: string[]) {
  return array.filter(arrayItem => arrayItem === item).length
}
