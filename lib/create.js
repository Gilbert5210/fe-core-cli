/**
 * @description cli
*/
const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const ejs = require('ejs')
const os = require('os')
const spawn = require('cross-spawn');
const ora = require('ora')
const process = require('process')
const shell = require('shelljs');
const log = require('./log');
const { copyFolder, createSuccessCallback} = require('./utils');

let tplList = ['fast-vue3-lib', 'h5', 'node-mock', 'vue3-ts', 'h5-vue2', 'h5-vue3-ts']
let excludeFileList = ['node_modules', 'dist']
let noNpmList = ['h5', 'node-mock']

module.exports = async function (name, options) {
  const cwd = process.cwd() //node 命令执行路径
  const projUrl = path.join(cwd, name)
  //目录下存在此项目文件夹
  if (fs.existsSync(projUrl)) {
    //是否带有-f强制创建指令
    if (options.force) {
      await fs.remove(projUrl)
    } else {
      //todo: 询问用户是否确定要覆盖
      inquirer.prompt([
        {
          name: 'action',   //boolean
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            }, {
              name: 'Cancel',
              value: false
            }
          ]
        },
      ]).then(async answer => {
        let { action } = answer
        if (!action) {
          return;
        } else if (action === 'overwrite') {
          // 移除已存在的目录
          await fs.remove(projUrl)
          createProject(name, projUrl)
        }
      })
    }
  } else {
    createProject(name, projUrl)
  }
}

const createQuestions = [
  {
    name: 'npmScope',
    message: '请输入包的scope名称',
    default: 'demo'
  },
  {
    name: 'componentPrefix',
    message: '请输入组件名的前缀（如 el）',
    default: 'demo'
  },
  {
    name: 'author',
    message: 'Input the project author: ',
    default: os.userInfo().username
  }
]


/**
 * 创建项目文件
 *
 * @param {string} name
 * @param {string} projUrl
 */
const createProject = (name, projUrl) => {
  let choices = []
  tplList.forEach(item => {
    choices.push({ name: item })
  })
  //询问需要的模板
  inquirer.prompt([
    {
      name: 'tplname',
      type: 'list',
      message: '请选择一个模板使用: ',
      choices: choices
    },
    {
      type: "input",
      name: 'description',
      message: '请输入项目描述信息',
      default: '脚手架生成的 vue3组件库模板'
    },
  ]).then(async answer => {
    let { tplname, description } = answer
    if (tplname) {
      let otherAnwser = null
      const destUrl = path.join(__dirname, '../', 'templates/', tplname);
      
      // fast-vue3-lib 需要特殊处理
      if (tplname === 'fast-vue3-lib') {
        otherAnwser =  await inquirer.prompt(createQuestions)
        await copyFolder(destUrl, projUrl)
        
        // 需要重写的配置
        if (otherAnwser?.componentPrefix) {
          createSuccessCallback(name, otherAnwser.componentPrefix, otherAnwser.npmScope, otherAnwser.author, description)
        }
        
        log.outCyanLog(`目录： ${projUrl} 项目名：${name} 创建成功！`)
        startShell(name, tplname)
        return
      }
      
      await deepCopyFiles(destUrl, projUrl, name)  //复制文件
      log.outCyanLog(`目录： ${projUrl} 项目名：${name} 创建成功！`)
      startShell(name, tplname)  //安装依赖
    }
  })
}

/**
 * 拷贝文件夹下所有文件
 * @param destUrl
 * @param projUrl
 * @param name
 * @returns {Promise<void>}
 */
/**
 * 拷贝文件夹下所有文件
 * @param destUrl
 * @param projUrl
 * @param name
 * @returns {Promise<void>}
 */
const deepCopyFiles = async (destUrl, projUrl, name) => {
  try {
    await fs.promises.mkdir(projUrl, { recursive: true });
    
    const files = await fs.promises.readdir(destUrl);
    const filteredFiles = files.filter(file => excludeFileList.indexOf(file) === -1);
    
    await Promise.all(filteredFiles.map(async (file) => {
      const filePath = path.join(destUrl, file);
      const destPath = path.join(projUrl, file);
      const stats = await fs.promises.stat(filePath);
      
      if (stats.isDirectory()) {
        await deepCopyFiles(filePath, destPath, name);
      } else {
        const data = await ejs.renderFile(filePath, { name });
        await fs.promises.writeFile(destPath, data);
      }
    }));
  } catch (err) {
    console.error(`Error copying files: ${err.message}`);
    throw err; // 重新抛出错误以便调用者处理
  }
};
/**
 * shell命令
 */
const startShell = async (name, tplname) => {
  //如果是不需要安裝依賴的
  if (noNpmList.findIndex((item) => item === tplname) > -1) {
    log.outCyanLog(`创建${tplname}成功！`)
    return
  }
  
  const spinner = ora('安装依赖中......').start();
  
  const shellCommand = `cd ${name} && pnpm install`
  
  shell.exec(shellCommand, (err, stdout, stderr) => {
    console.log(stdout)
    if (err) {
      spinner.fail()
      log.outRedLog('安装依赖失败')
    } else {
      spinner.succeed()
      log.outCyanLog(`安装依赖成功！！\n cd ${name} \n npm run dev`)
    }
  })
  //
  // shell.cd(name);
  //
  // // 安装依赖
  // const pnpmCommend = spawn('pnpm install', [], {
  //   stdio: 'inherit'
  // });
  //
  // // 监听执行结果
  // pnpmCommend.on('close', function (code) {
  //   // 执行失败
  //   if (code !== 0) {
  //     log.outRedLog('安装依赖失败')
  //     process.exit(1);
  //   }
  //   // 执行成功
  //   else {
  //     log.outCyanLog(`安装依赖成功！！\n cd ${name} \n npm run dev`)
  //   }
  //   spinner.stop()
  // })
}