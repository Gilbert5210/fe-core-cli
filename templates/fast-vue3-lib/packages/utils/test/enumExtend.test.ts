// import { describe, expect, test } from '@jest/globals'
import { EnumExtend } from '../src/EnumExtend'

describe('EnumExtend', () => {
  const testObj = {
    open: {
      label: '开启',
      value: '1',
      other: 'test'
    },
    close: {
      label: '关闭',
      value: '0',
      other: 'test'
    }
  }
  const testEnum = EnumExtend(testObj)
  test('get origin info', () => {
    expect(testEnum.open.value).toEqual(testObj.open.value)
    expect(testEnum.open.label).toEqual(testObj.open.label)
  })
  test('getInfobyVal', () => {
    // 存在的val
    expect(testEnum.getInfoByVal('1')).toMatchObject(testObj.open)
    expect(testEnum.getInfoByVal('1', 'other')).toEqual(testObj.open.other)
    expect(testEnum.getInfoByVal('1', 'nokey')).toEqual('')
    // 不存在的val
    expect(testEnum.getInfoByVal('3')).toEqual('')
    expect(testEnum.getInfoByVal('3', 'd')).toEqual('')
  })
  test('getLabelByVal', () => {
    expect(testEnum.getLabelByVal('1')).toEqual(testObj.open.label)
  })

  test('getKeyByVal', () => {
    expect(testEnum.getKeyByVal('1')).toEqual('open')
    expect(testEnum.getKeyByVal('4')).toEqual('')
  })
  test('getOptions', () => {
    expect(testEnum.getOptions()).toHaveLength(2)
  })
  test('getOptionsWithAll', () => {
    expect(testEnum.getOptionsWithAll()).toHaveLength(3)
    expect(testEnum.getOptionsWithAll({ label: 'all', value: '-1' })).toHaveLength(3)
  })
  test('getKeys', () => {
    expect(testEnum.getKeys()).toMatchObject(['open', 'close'])
  })
})
