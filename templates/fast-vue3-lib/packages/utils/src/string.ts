/**
 * @author Gilbert
 * @Description: 字符串相关的工具函数
 * @date 29.05.2023
 */

/**
 * 字符转换成横杠 字符
 * @param key
 * @return 返回转化后的字符串
 * @example
 * ``` typescript
 * kebabCase('KsgUI')
 * => 'ksg-ui'
 * ```
 */
export function kebabCase(key: string): string {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

/**
 * 格式化首字母小写
 * @param inputString
 * @return 返回转化后的字符串
 * @example
 * ``` typescript
 * firstLetterToLowerCase('KsgUI')
 * => 'ksgUI'
 * ```
 */
export function firstLetterToLowerCase(inputString: string) {
  if (inputString.length === 0) {
    return inputString // 处理空字符串
  }
  const [firstLetter, ...restOfString] = inputString
  return firstLetter.toLowerCase() + restOfString.join('')
}
