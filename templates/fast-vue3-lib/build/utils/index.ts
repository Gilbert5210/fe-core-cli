import type { TaskFunction } from 'gulp'

export const withTaskName = <T extends TaskFunction>(name: string, fn: T) => {
  return Object.assign(fn, { displayName: name })
}

export const complete = (taskName: string) => {
  console.log(`---- ${taskName} task completed ----`)
}

export * from './paths'
export * from './process'
export * from './delPath'
