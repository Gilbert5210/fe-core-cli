import { remove } from 'fs-extra'

export async function delPath(glob: string | string[]) {
  const globs = Array.isArray(glob) ? glob : [glob]
  await Promise.all(globs.map((path) => remove(path)))
}
