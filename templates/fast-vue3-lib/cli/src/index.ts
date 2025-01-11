import { program } from 'commander'
import { createComponent } from './command/create-component'
import { c } from './util/log-utils'
import { GLOBAL_CONFIG } from '@{{npmScope}}/build/globalConfig'
import { removeComponent } from './command/removeComponent'
import { updatePackageNames } from './util/update-package-names'

export const mainEntry = () => {
  c(`${GLOBAL_CONFIG.COMPONENT_LIB_NAME} cli 工具`)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  program.version(require('../package').version).usage('<command> [arguments]')

  program.command('create').description('create a new component').alias('c').action(createComponent)
  program.command('remove').description('remove a component').alias('c').action(removeComponent)
  program.command('updatePackageName').description('updatePackageNames').alias('c').action(updatePackageNames)

  program.parse(process.argv)

  if (!program.args.length) {
    program.help()
  }
}
