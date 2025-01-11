import { spawn } from 'child_process'
import chalk from 'chalk'
import consola from 'consola'
import { ROOT_PATH } from './paths'

export const run = async (command: string, cwd: string = ROOT_PATH) => {
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ')

    consola.info(`run: ${chalk.green(`${cmd} ${args.join(' ')}`)}`)

    const app = spawn(cmd, args, {
      cwd, // 子进程当前的工作目录
      stdio: 'inherit',
      shell: process.platform === 'win32'
    })
    const onProcessExit = () => app.kill('SIGHUP')

    app.on('close', (code) => {
      // 'close' 事件将始终在 'exit' 或 'error'已经触发之后触发
      process.removeListener('exit', onProcessExit)
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`))
      }
    })
    process.on('exit', onProcessExit) // 监听子进程结束后触发
  })
}
