import { cloneDeep, isArray } from 'lodash-es'

/**
 * 它从数组中移除一个元素，然后将其插入到另一个指定的位置
 * @param data
 * @param sourceIndex
 * @param targetIndex
 * @example
 * ``` typescript
 * const arr = [1, 2, 3, 4, 5];
 * insertTargetArr(arr, 1, 3)
 * => [1, 3, 4, 2, 5]
 * ```
 */
export const insertTargetArr = (data: any[], sourceIndex: number, targetIndex: number) => {
  const currArr = cloneDeep(data)

  const sourceObj = data[sourceIndex]

  currArr.splice(sourceIndex, 1)
  currArr.splice(targetIndex, 0, sourceObj)

  return currArr
}

type ArrayItem = {
  label: string
  value: any
  [key: string]: any
}

/**
 * 数组转换成为对象映射表
 * @param data
 * @param label
 * @param value
 * @example
 * ``` typescript
 * const arr = [
 *    {
 *      label: 'test1',
 *      value: 20
 *    },
 *    {
 *      label: 'test2',
 *      value: 40
 *    }
 * ];
 *
 * arrayToMap(arr)
 * => {
 *   20: 'test1',
 *   40: 'test2'
 * }
 * ```
 */
export const arrayToMap = (data: ArrayItem[], label = 'label', value = 'value') => {
  if (!isArray(data)) {
    console.error('ArrayToMap: data not a array!')
    return {}
  }

  return data.reduce((prev: Record<string | number, string>, curr: ArrayItem) => {
    prev[curr[value]] = curr[label]

    return prev
  }, {})
}
