import { ref } from 'vue'
import { insertTargetArr } from '../array'

const TABLE_ROW_CLASS = 'ant-table-row'
const TABLE_CLASS = 'ant-table'

const TABLE_ROW_DRAG_TARGET = 'ksg-common__table-drag-target'

/**
 * 表格实现行拖拽的hook
 */
export const useTableDraggable = <T>(
  dataSource: T[],
  callBack: (data: T[], originData: T[], sourceIndex: number, targetIndex: number) => void
) => {
  // const sourceObj = ref<T>();
  // const targetObj = ref<T>();
  const sourceIndex = ref()
  const targetIndex = ref()

  const customRow = (record: T, index: number) => {
    // 开始拖拽
    const onDragstart = (event: DragEvent) => {
      const ev = event || window.event
      ev.stopPropagation()
      // 得到源目标数据
      // sourceObj.value = record;
      sourceIndex.value = index
    }

    // 拖动元素经过的元素
    const onDragover = (event: DragEvent) => {
      const ev = event || window.event
      ev.preventDefault()

      const dataTransfer: DataTransfer | null = ev.dataTransfer
      if (dataTransfer) {
        dataTransfer.dropEffect = 'move'
        dataTransfer.effectAllowed = 'move'
      }

      targetIndex.value = index
    }

    // 拖动到达目标元素
    const onDragenter = (event: Event) => {
      const ev = event || window.event

      const closestTableElement = (ev.target as HTMLElement).closest(`.${TABLE_CLASS}`)

      ev.preventDefault()
      const list = closestTableElement?.getElementsByClassName(TABLE_ROW_CLASS)
      const node = closestTableElement?.getElementsByClassName(TABLE_ROW_DRAG_TARGET)

      if (node?.length) {
        node[0].classList.remove(TABLE_ROW_DRAG_TARGET)
      }

      if (list?.length) {
        list[index].classList.add(TABLE_ROW_DRAG_TARGET)
      }
    }

    // 鼠标松开
    const onDrop = (event: Event) => {
      const ev = event || window.event
      ev.stopPropagation()
      // 得到目标数据
      // targetObj.value = record;
      targetIndex.value = index
      const closestTableElement = (ev.target as HTMLElement).closest(`.${TABLE_CLASS}`)
      const node = closestTableElement?.getElementsByClassName(TABLE_ROW_DRAG_TARGET)
      if (node?.length) {
        node[0].classList.remove(TABLE_ROW_DRAG_TARGET)
      }

      if (targetIndex.value === sourceIndex.value) {
        return
      }

      const resultData = insertTargetArr(dataSource, sourceIndex.value, targetIndex.value)

      callBack(resultData, dataSource, sourceIndex.value, targetIndex.value)
    }

    return {
      onDragstart,
      onDragover,
      onDrop,
      onDragenter
    }
  }

  return {
    customRow
  }
}

export default useTableDraggable
