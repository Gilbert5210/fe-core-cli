/**
 * @author Gilbert
 * @Description: 类型推到常用工具（类型体操）
 * @date 31.05.2023
 */

import type { Prop } from 'vue'
// eslint-disable-next-line vue/prefer-import-from-vue
import type { IfAny } from '@vue/shared'

/**
 * 自定义属性设置为可选键
 */
export type PartialPro<T, K extends keyof T> = { [P in K]?: T[P] } & Omit<T, K>

// 继承覆盖字段
export type Override<P, S> = Omit<P, keyof S> & S

/**
 * obj = {
 *   a:1,
 *   b:2
 * }
 *
 * 1. 获取key 作为类型
 * keyof typeof obj => "a" | "b"
 * 2. 如何获取value作为类型
 * type valueModel = ValueOf<typeof obj>
 * 1 ｜ 2
 */
export type ValueOf<T> = T[keyof T]

type InferPropType<T> = [T] extends [null]
  ? any // null & true would fail to infer
  : [T] extends [{ type: null | true }]
  ? // eslint-disable-next-line max-len
    any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
  : [T] extends [ObjectConstructor | { type: ObjectConstructor }]
  ? Record<string, any>
  : [T] extends [BooleanConstructor | { type: BooleanConstructor }]
  ? boolean
  : [T] extends [DateConstructor | { type: DateConstructor }]
  ? Date
  : [T] extends [(infer U)[] | { type: (infer U)[] }]
  ? U extends DateConstructor
    ? Date | InferPropType<U>
    : InferPropType<U>
  : [T] extends [Prop<infer V, infer D>]
  ? unknown extends V
    ? IfAny<V, V, D>
    : V
  : T

type InnerRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } | { default: any }
    ? T[K] extends { default: undefined }
      ? never
      : K
    : never
}[keyof T]

type InnerOptionalKeys<T> = Exclude<keyof T, InnerRequiredKeys<T>>

/**
 * 提取 props 对象的 propType
 */
export type ExtractInnerPropTypes<O> = {
  [K in keyof Pick<O, InnerRequiredKeys<O>>]: InferPropType<O[K]>
} & {
  [K in keyof Pick<O, InnerOptionalKeys<O>>]?: InferPropType<O[K]>
}

/**
 * 统一替换字段为目标类型 S
 * T：目标对象
 */
export type ReplaceFieldsWithTarget<T, S> = {
  [K in keyof T]: S
}
