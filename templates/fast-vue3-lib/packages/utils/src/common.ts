/**
 * @author Gilbert
 * @Description: 通用的工具函数
 * @date 31.05.2023
 */
import { isArray, isNumber, uniq, cloneDeep, isObject, isFunction, find } from 'lodash-es'
import type { Slots } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { REGEX } from './regex'
import { HTTP_PATTERN } from './constant'
import axios from 'axios'

/**
 * 文件下载
 * 解决浏览器把下载文件识别为预览文件的问题
 * @param url 下载地址
 * @param fileName 自定义文件名
 */

/**
 * 文件下载
 * 解决浏览器把下载文件识别为预览文件的问题
 * @param url 下载地址
 * @param fileName 自定义文件名
 * @return 无返回
 * @example
 * ``` typescript
 * urlDownloadFile('
 * https://cdnfile.corp.xxx.com/kc/files/a/sogame-static/gameclound-compatibility/Android.xlsx',
 * '测试的文件.xlsx'
 * )
 *
 * ```
 */
export const urlDownloadFile = (url: string, fileName: string) => {
  const link = document.createElement('a')
  link.style.display = 'none'
  document.body.appendChild(link)
  const name = encodeURIComponent(fileName)
  // response-content-type=application/octet-stream : 解决点击下载变成预览的功能
  // response-content-disposition： 解决自定义文件名的问题
  // eslint-disable-next-line max-len
  link.href = `${url}?response-content-type=application/octet-stream;charset=UTF-8&response-content-disposition=attachment;filename=${name}`
  link.target = '__blank'
  link.click()
  window.URL.revokeObjectURL(link.href)
}

// 轮询函数类型
export type loopIntervalModel = {
  start: () => void
  stop: () => void
}
// eslint-disable-next-line no-unused-vars
type loopIntervalCallback = (stop: () => void) => Promise<void | number>
/**
 * 轮询函数
 * @param callback 回调函数
 * @param interval 时间间隔
 */
export function loopInterval(callback: loopIntervalCallback, interval = 2000): loopIntervalModel {
  let timer: any
  let isStop = false

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const loop = async () => {
    try {
      await callback(stop)
    } catch (err) {
      throw new Error('轮询出错：', err as any)
    }

    if (isStop) {
      return
    }

    return (timer = setTimeout(loop, interval))
  }

  const stop = () => {
    isStop = true
    clearTimeout(timer)
  }

  const start = async () => {
    isStop = false
    await loop()
  }

  return {
    start,
    stop
  }
}

export interface treeItemModel {
  [key: string]: any
  children?: treeItemModel[]
}
/**
 * 树形结构的遍历 map
 * @param tree
 * @param func
 * @return{Array}
 */
export const treeForeachMap = <T = treeItemModel, K = treeItemModel>(
  tree: T[],
  // eslint-disable-next-line no-unused-vars
  func: (item: T) => K | boolean
): K[] => {
  if (!isArray(tree)) {
    return []
  }

  return tree.reduce((prev: K[], curr) => {
    const result = func(curr)

    if (!result) {
      return prev
    }

    const currData = result === true ? curr : (result as K)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const childrenData = curr.children ? curr.children : []

    if (childrenData.length > 0) {
      prev.push({
        ...currData,
        children: treeForeachMap(childrenData, func)
      } as K)
    } else {
      prev.push({
        ...currData
      } as K)
    }

    return prev
  }, [])
}

/**
 * 扁平数组转换成树形结构数据
 * 这种必须要有个根结点，不然会出问题
 * @param arr
 * @param pid
 * @return {obj: object}
 */
export function arrFormatTree(arr: Record<string, any>[], pid: object) {
  const map = new WeakMap() // 生成map存储元素

  for (const item of arr) {
    // 若map中没有当前元素，添加并初始化children
    if (!map.has(item.id)) {
      map.set(item.id, { ...item, children: [] })
    } else {
      // 若不存在父元素 pid，后续会构造一个空的父元素，就会出现当前元素 item 已经存在的情况；此时需要将当前元素与已存在的元素（创建的父元素）进行合并
      map.set(item.id, { ...map.get(item.id), ...item })
    }

    // 查找父元素，存在则将该元素插入到children
    if (map.has(item.pid)) {
      map.get(item.pid).children.push(map.get(item.id))
    } else {
      // 否则初始化父元素，并插入children
      map.set(item.pid, { children: [map.get(item.id)] })
    }
  }

  return map.get(pid)
}

/**
 * 映射对象转换成表格映射参数对象
 * {
 *   test1: '测试用户'
 * } =>
 * {
 *   test1: {
 *     text: 测试用户
 *   }
 * }
 * @param data
 */
export const objMapFormatToTableValueEnum = (data: Record<string, any>) => {
  const valueEnum: Record<string, any> = {}

  Object.entries(data).forEach(([key, value]) => {
    valueEnum[key] = {
      text: value
    }
  })

  return valueEnum
}

export const MEMORY_SIZE_UNIT = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] as const

// 联合类型
export type symbolModel = 'bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB'

/**
 * 目标内存大小转换成字节
 * @param num
 * @param symbol 单位
 */
export const byteConvert = (num: number, symbol: symbolModel) => {
  const targetIndex = MEMORY_SIZE_UNIT.findIndex((item) => item === symbol) || 0

  if (!isNumber(num)) {
    return 0
  }

  return num * Math.pow(2, 10 * targetIndex)
}

/**
 * 获取base64地址
 * @param file
 */
export function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

/**
 * 获取图片的像素{
 *   width: '',
 *   height: ''
 * }
 * @param img
 */
export const getImgPx = (
  img: string
): Promise<{
  width: number
  height: number
}> => {
  const image = new Image()
  image.src = img
  return new Promise((resolve) => {
    image.onload = () => {
      const width = image.width
      const height = image.height
      resolve({ width, height })
    }
  })
}

/**
 * 校验对象数组中，指定key值是否存在相同的值
 * true: 存在重复
 * false: 不存在重复
 * @param data
 * @param key
 * @return Boolean
 */
export function checkObjectArrRepeatValue<T>(data: T[], key: keyof T) {
  const targetKeyValues = data.map((item) => item[key])
  const uniqValues = uniq(targetKeyValues)

  return targetKeyValues.length !== uniqValues.length
}

/**
 * 格式化 undefined || null 为 '-'
 * @param data
 */
export const formatUndefinedOrNull = (data: any) => {
  return data || data === 0 ? data : '-'
}

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  const res: any = cloneDeep(src)
  for (key in target) {
    res[key] = isObject(res[key]) ? deepMerge(res[key], target[key]) : (res[key] = target[key])
  }
  return res
}
export function getSlot(slots: Slots, slot = 'default', data?: any) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) {
    return null
  }
  return slotFn(data)
}

/**
 * 通过分析matched成为面包屑数据
 * @param matched
 */
export const getBreadcrumb = (matched: RouteLocationNormalizedLoaded['matched']) => {
  return matched.filter((routeItem) => !routeItem.meta?.hideBreadcrumb)
}

/**
 * 常量转换成选项数组
 * @param textObj
 * @param valArr
 */
export function constToOptions<T, V extends keyof T>(textObj: T, valArr: V[], label = 'label', value = 'value') {
  return valArr.map((item) => {
    return {
      [label]: textObj[item],
      [value]: item
    }
  })
}

/**
 * 校验是字符串否为url
 * 它可以检测以 "http"、"https" 或 "ftp" 开头的URL
 * @param url{string}
 * @typeParam 类型参数
 * @return{Boolean} true: 表示是个可用url
 * @example 使用例子
 * ``` typescript
 * const result = isValidURL('test')
 * ===> false
 *
 * const result = isValidURL('https://ksg-ui.staging.xxx.com/utilModules/README.html')
 * ===> true
 * ```
 */
export function isValidURL(url: string) {
  return REGEX.urlPattern.test(url)
}

/**
 * 判断是否问图片类型
 * @param fileName
 * @example 使用例子
 * ``` typescript
 * const fileName = 'myImage.jpg';
 * const result = isImageFile(fileName)
 * ===> true
 * ```
 */
export function isImageFile(fileName: string) {
  // 将文件名转换为小写以确保不区分大小写
  const ext = fileName.toLowerCase()
  // 定义常见的图片文件扩展名
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']

  // 检查文件的扩展名是否在图片扩展名列表中
  return imageExtensions.some((extension) => ext.endsWith(extension))
}

/**
 * 判断是否为视频文件类型
 * @param fileName
 * @example 使用例子
 * ``` typescript
 * const fileName = 'myVideo.mp4';
 * const result = isImageFile(fileName)
 * ===> true
 * ```
 */
export function isVideoFile(fileName: string) {
  const ext = fileName.toLowerCase()
  const videoExtensions = ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm']

  return videoExtensions.some((extension) => ext.endsWith(extension))
}

type TreeItem = {
  [key: string]: any
  children?: Record<string, any>[]
}
/**
 * 树形数组中
 * 递归函数来查找特定 ID 的元素
 * @param tree
 * @param id
 * @param key 默认要查找的唯一值的 字段名
 * @example 使用例子
 * ``` typescript
 * const treeData =
 *  [{
 *    id: '1',
 *    name: '第一层数据',
 *    children: [{
 *      id: '1-1',
 *      name: '第1-1层数据'
 *    }]
 *  },
 *  {
 *    id: '2',
 *    name: '第二层数据'
 *  }],
 * const target = findElementById(treeData, '1-1')
 * ===>
 * {
 *   id: '1-1',
 *   name: '第1-1层数据'
 * }
 * ```
 */
export function findElementById<T = Record<string, any>>(tree: T[], id: string | number, key = 'id'): T | null {
  const foundElement = find(tree, { [key]: id })

  if (foundElement) {
    return foundElement as T
  }

  for (const node of tree) {
    const nodeItem = node as TreeItem
    if (nodeItem.children && nodeItem.children.length > 0) {
      const foundInChild = findElementById(nodeItem.children, id, key)

      if (foundInChild) {
        return foundInChild as T
      }
    }
  }

  return null
}

/**
 * 指定关键的字段查找，默认ID。更新该项数据
 * @param tree
 * @param id
 * @param newData
 * @param key
 * @return []
 * @example 使用例子
 * ``` typescript
 * const treeData =
 *  [{
 *    id: '1',
 *    name: '第一层数据',
 *    children: [{
 *      id: '1-1',
 *      name: '第1-1层数据'
 *    }]
 *  },
 *  {
 *    id: '2',
 *    name: '第二层数据'
 *  }],
 *  const newData = {
 *    newData: '新增数据'
 *  }
 * const target = updateTreeNodeById(treeData, '1-1', newData)
 * ===>
 *  [{
 *    id: '1',
 *    name: '第一层数据',
 *    children: [{
 *      id: '1-1',
 *      name: '第1-1层数据',
 *      newData: '新增数据'
 *    }]
 *  },
 *  {
 *    id: '2',
 *    name: '第二层数据'
 *  }],
 * ```
 */
export function updateTreeNodeById<T = Record<string, any>>(
  tree: T[],
  id: number,
  newData: Partial<T>,
  key = 'id'
): T[] {
  return tree.map((node) => {
    const nodeItem = node as TreeItem

    if (node[key as keyof typeof node] === id) {
      // 找到匹配的节点，使用新数据覆盖旧数据
      return { ...node, ...newData }
    } else if (nodeItem.children?.length) {
      // 递归更新子节点
      return { ...node, children: updateTreeNodeById(nodeItem.children, id, newData, key) }
    }

    return node
  })
}

/**
 * 树形数组中，根据ID删除该项
 * @param tree
 * @param id
 * @param key
 * @example 使用例子
 * ``` typescript
 * const treeData =
 *  [{
 *    id: '1',
 *    name: '第一层数据',
 *    children: [{
 *      id: '1-1',
 *      name: '第1-1层数据'
 *    }]
 *  },
 *  {
 *    id: '2',
 *    name: '第二层数据'
 *  }],
 *  const newData = {
 *    newData: '新增数据'
 *  }
 * const target = deleteTreeNodeById(treeData, '1-1')
 * ===>
 *  [{
 *    id: '1',
 *    name: '第一层数据',
 *    children: []
 *  },
 *  {
 *    id: '2',
 *    name: '第二层数据'
 *  }],
 * ```
 */
export function deleteTreeNodeById<T = Record<string, any>>(tree: T[], id: number, key = 'id'): T[] {
  return tree.reduce((previousValue: T[], node) => {
    if (node[key as keyof typeof node] === id) {
      // 如果找到匹配的节点，不将其添加到结果中
      return previousValue
    }

    const nodeItem = node as TreeItem
    // 防止便利过后新增了空的 children 字段
    let children = {}
    if (nodeItem.children?.length) {
      // 递归处理子节点，并将非匹配节点添加到结果中
      children = {
        children: deleteTreeNodeById(nodeItem.children || [], id, key)
      }
    }

    const updatedNode = { ...node, ...children }
    return [...previousValue, updatedNode]
  }, [])
}

/**
 * 用于检查给定的 URL 是否以 "http://" 或 "https://" 开头
 * @param url
 */
export function isHttpOrHttps(url: string) {
  // 正则表达式，匹配以 "http://" 或 "https://" 开头的 URL
  return HTTP_PATTERN.test(url)
}

export type QueueModel<T> = (() => Promise<T>) | null
export type ProgressFunc<T> = (res: T) => void

/**
 * 请求队列限制并发数量
 */
export class RequestQueue<T> {
  private queue: QueueModel<T>[] = []
  public concurrencyLimit = 3
  private pendingRequestList: Promise<T>[] = []
  public currRequest: any

  constructor(concurrencyLimit: number, currRequest: any) {
    this.pendingRequestList = []
    this.queue = []
    this.concurrencyLimit = concurrencyLimit || this.concurrencyLimit
    this.currRequest = currRequest
  }

  // 终止请求
  clearAll() {
    // 清空剩余的队列信息
    this.queue = []
    // 取消正发出去的请求
    this.pendingRequestList.forEach((promise) => this.currRequest.cancelRequest(promise))
  }

  concurrentReq(tasks: QueueModel<T>[], onProgress: ProgressFunc<T>, limit?: number): Promise<T[]> {
    this.queue = tasks
    const currLimit = limit || this.concurrencyLimit

    return new Promise((resolve, reject) => {
      let num = 0 // 当前在跑的请求数量（在跑的请求数量要小于限制的数量）
      const results: T[] = [] // 最终并发请求结果存放的数组

      // 递归闭包函数调用发请求，Promise返回最终结果
      const goNext = () => {
        if (this.queue.length === 0 && num === 0) {
          // 当没有更多任务且没有请求正在进行时
          resolve(results) // 所有请求已完成，resolve吐出去返回结果
          return
        }

        while (num < currLimit && this.queue.length > 0) {
          // 当请求任务小于3且还有任务继续干时，goNext
          const promiseTask = this.queue.shift() // 把并发任务数组中第一项剔除掉，并拿到第一项（请求接口）
          if (!promiseTask) {
            return
          }

          num = num + 1 // 并记录一下当前的请求数量
          const nextRequestPromise = promiseTask()
          this.pendingRequestList.push(nextRequestPromise)

          nextRequestPromise
            .then((res) => {
              num = num - 1 // 请求成功，就把计数减一
              results.push(res) // 把请求的结果依次存起来
              onProgress(res)
              goNext() // 递归调用，继续执行下一个请求任务
            })
            .catch((err) => {
              num = num - 1 // 请求失败，也把计数减一
              console.error(`此接口：${promiseTask}请求失败，报错信息：${err}`)
              results.push(err)

              if (axios.isCancel(err)) {
                reject('cancel')
              }

              goNext() // 递归调用，继续执行下一个请求任务
            })
            .finally(() => {
              // 请求结束后，需要手动清理
              this.pendingRequestList = this.pendingRequestList.filter((promise) => promise === nextRequestPromise)
            })
        }
      }

      goNext()
    })
  }
}

export type VideoInfoModel = {
  duration: number
  width: number
  height: number
}

/**
 * 获取视频信息
 * @param file
 * @return {
 *   duration
 *   width
 *   height
 * }
 */
export const getVideoPlayerInfo = (file: File): Promise<VideoInfoModel> => {
  return new Promise((resolve) => {
    const videoElement = document.createElement('video')
    videoElement.src = URL.createObjectURL(file)
    videoElement.addEventListener('loadedmetadata', function () {
      resolve({
        duration: videoElement.duration,
        width: videoElement.videoWidth,
        height: videoElement.videoHeight
      })
    })
  })
}
