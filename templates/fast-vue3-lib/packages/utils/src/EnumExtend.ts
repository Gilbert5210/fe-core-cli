export interface EnumObject {
  [key: string]: {
    label: string
    value: any
    [key: string]: any
  }
}
export interface Option {
  label: string
  value: any
}
export interface EnumOriginInterface {
  getInfoByVal(val: any, key?: string, defaultVal?: string): string
  getLabelByVal(val: any): string
  getKeyByVal(val: any): string
  getOptions(): Array<{ label: string; value: any }>
  getOptionsWithAll(all?: { label: string; value: any }): Array<{ label: string; value: any }>
  getKeys(): string[]
  getValueToLabelMap(): Record<any, string>
}
const EnumOrigin: EnumOriginInterface = {
  /**
   * 根据value的值返回对应的枚举
   * @param val
   * @param key
   * @param defaultVal
   * @return obj || defaultVal
   */
  getInfoByVal(val, key = '', defaultVal = '') {
    const array = Object.entries(this)
    for (const element of array) {
      if (val === element[1].value) {
        if (key) {
          return element[1][key] || defaultVal
        }
        return element[1]
      }
    }
    return defaultVal
  },
  /**
   * 根据value的值返回对应的label
   * @param val
   * @return label
   */
  getLabelByVal(val) {
    return this.getInfoByVal(val, 'label')
  },
  /**
   * 根据value的值返回对应的key
   * @param val
   * @return key
   */
  getKeyByVal(val) {
    const array = Object.entries(this)
    for (const element of array) {
      if (val === element[1].value) {
        return element[0]
      }
    }
    return ''
  },
  /**
   * 返回定义对象的的所有[{ label,value }],一般用于select option的使用
   * @return options
   */
  getOptions() {
    const newArr: Option[] = []
    Object.entries(this).forEach(([, value]: [string, Option]) => {
      newArr.push(value)
    })
    return newArr
  },
  /**
   * 比getOptions多返回一个全部选项，{
   *     label: '全部',
   *     value: ''
   *  },
   * 当默认选项不符合要求时，可以自己传入 eg: {label: 'all', value: -1}
   * @return options
   */
  getOptionsWithAll(all: Option) {
    const newArr: Option[] = []
    if (all) {
      newArr.push(all)
    } else {
      newArr.push({
        label: '全部',
        value: ''
      })
    }
    Object.entries(this).forEach(([, value]) => {
      newArr.push(value)
    })
    return newArr
  },
  /**
   * 返回定义对象的的key
   * @return options
   */
  getKeys() {
    return Object.keys(this)
  },

  /**
   * 根据value获取label的映射关系map
   * eg:
   * {
   *    test: {
   *      label: '红色',
   *      value: 1
   *    },
   *    test2: {
   *      label: '绿色',
   *      value: 2
   *    }
   * }
   * ======》》》》
   * {
   *   1: '红色',
   *   2: '绿色'
   * }
   */
  getValueToLabelMap() {
    return Object.entries(this).reduce((previousValue, [, item]: [string, Option]) => {
      const { label, value } = item
      previousValue[value] = label

      return previousValue
    }, {} as Record<any, string>)
  }
}
/**
 * 为枚举对象添加公共方法
 * objEnum = EnumExtend(obj);
 * @param obj
 * @return objEnum
 * @example 使用例子
 * ``` typescript
 * const testObj = {
 *   add: {
 *     label: '新增',
 *     value: 1
 *   },
 *   edit: {
 *     label: '修改',
 *     value: 2
 *   },
 *   removeShelves: {
 *     label: '下架',
 *     value: 3
 *   },
 *   onShelves: {
 *     label: '上架',
 *     value: 4
 *   },
 *   none: {
 *     label: '无',
 *     value: 5
 *   }
 * }
 * const TEST_TYPE = EnumExtend(testObj)
 * ===>
 * const valueToLabelMap = TEST_TYPE.getValueToLabelMap()
 * {
 *   1: '新增',
 *   2: '修改',
 *   3: '下架',
 *   4: '上架',
 *   5: '无',
 * }
 *
 * const infoByVal = TEST_TYPE.getInfoByVal(1)
 * {
 *   label: '新增',
 *   value: 1
 * }
 *
 * const infoByVal = TEST_TYPE.getInfoByVal(1, 'label')
 * '新增'
 *
 * const labelByVal = TEST_TYPE.getLabelByVal(4)
 * '上架'
 *
 * const keyByVal = TEST_TYPE.getKeyByVal(4)
 * 'onShelves'
 *
 * const Options = TEST_TYPE.getOptions()
 * [{
 *  label: '新增',
 *  value: 1
 * }, {
 *  label: '修改',
 *  value: 2
 * }, ...3+]
 *
 * const OptionsWithAll = TEST_TYPE.getOptionsWithAll()
 * [{
 *  label: '全部',
 *  value: ''
 * }, {
 *  label: '新增',
 *  value: 1
 * }, {
 *  label: '修改',
 *  value: 2
 * }, ...3+]
 * ```
 */
export function EnumExtend<T extends EnumObject>(obj: T): Record<keyof T, Option> & EnumOriginInterface {
  Object.setPrototypeOf(obj, EnumOrigin)
  return obj as unknown as Record<keyof T, Option> & EnumOriginInterface
}

export default EnumExtend
