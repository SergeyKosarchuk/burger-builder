export function count(items: any[], key:(item: any) => any, item: any,) {
  return items.filter(arrayItem => key(arrayItem) === key(item)).length
}
