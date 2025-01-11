import fs from 'fs'
import path from 'path'
import { GLOBAL_CONFIG } from '@{{npmScope}}/build/globalConfig'
import { PACKAGE_ROOT_PATH } from '@{{npmScope}}/build/utils/paths'

// 更新子包的 package.json 中的 name
export function updatePackageNames() {
  if (!fs.existsSync(PACKAGE_ROOT_PATH)) {
    throw new Error(`Packages directory not found: ${PACKAGE_ROOT_PATH}`)
  }

  // 读取所有子包目录
  const packageDirs = fs.readdirSync(PACKAGE_ROOT_PATH).filter((dir) => {
    const fullPath = path.join(PACKAGE_ROOT_PATH, dir)
    return fs.statSync(fullPath).isDirectory()
  })

  // 遍历并更新每个子包的 package.json
  packageDirs.forEach((packageDir) => {
    const packageJsonPath = path.join(PACKAGE_ROOT_PATH, packageDir, 'package.json')

    if (!fs.existsSync(packageJsonPath)) {
      console.warn(`Package.json not found for ${packageDir}, skipping...`)
      return
    }

    // 读取 package.json
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8')
    const packageJson = JSON.parse(packageJsonContent) as {
      name: string
      [key: string]: any
    }

    // 修改包名
    packageJson.name = `${GLOBAL_CONFIG.NPM_SCOPE}/${packageDir}`

    // 写回 package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8')

    console.log(`Updated package name to: ${packageJson.name}`)
  })
}
