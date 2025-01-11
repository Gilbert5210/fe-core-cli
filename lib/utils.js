const handlebars = require('handlebars')
const fs = require('fs-extra')
const log = require('./log');

const convertFirstUpper = (str) => {
	return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`
}

const getCamelName = (componentName) => {
	let ret = ''
	const list = componentName.split('-')
	list.forEach(item => {
		ret += convertFirstUpper(item)
	})
	return ret
}


/**
 * @desc 写入文件
 * @param fileName
 * @param data
 */
const writeFile = (fileName, data) => {
	if (fs.existsSync(fileName)) {
		const content = fs.readFileSync(fileName).toString()
		const result = handlebars.compile(content)(data)
		fs.writeFileSync(fileName, result)
	}
}

async function copyFolder(src, dest) {
	try {
		// 使用 fs.cp 直接拷贝整个目录
		await fs.promises.cp(src, dest, { recursive: true });
		console.log(`Copied folder: ${src} -> ${dest}`);
	} catch (error) {
		console.error(`Error copying folder: ${error}`);
		process.exit(1);
	}
}


/**
 * @desc 创建组件库成功回调
 * @param projectName
 * @param componentPrefix
 * @param npmScope
 * @param author
 * @param description
 */
const createSuccessCallback = (
	projectName,
	componentPrefix,
	npmScope,
	author,
	description
) => {
	const data = {
		libraryName: projectName,
		libraryNameCamel: getCamelName(projectName),
		description,
		author,
		npmScope,
		componentPrefix
	}
	
	writeFile(`${projectName}/tsconfig.json`, data)
	writeFile(`${projectName}/README.md`, data)
	writeFile(`${projectName}/package.json`, data)
	
	writeFile(`${projectName}/build/package.json`, data)
	writeFile(`${projectName}/build/globalConfig.ts`, data)
	writeFile(`${projectName}/build/src/buildUtil.ts`, data)
	
	writeFile(`${projectName}/cli/package.json`, data)
	writeFile(`${projectName}/cli/src/index.ts`, data)
	writeFile(`${projectName}/cli/src/command/removeComponent.ts`, data)
	writeFile(`${projectName}/cli/src/service/init-doc.ts`, data)
	writeFile(`${projectName}/cli/src/service/init-scss.ts`, data)
	writeFile(`${projectName}/cli/src/util/template-utils.ts`, data)
	writeFile(`${projectName}/cli/src/util/update-package-names.ts`, data)
	
	writeFile(`${projectName}/docs/vite.config.ts`, data)
	writeFile(`${projectName}/docs/.vitepress/config.ts`, data)
	writeFile(`${projectName}/docs/.vitepress/theme/index.ts`, data)
	writeFile(`${projectName}/docs/index.md`, data)
	writeFile(`${projectName}/docs/demos/tooltip/tooltip-1.vue`, data)
	writeFile(`${projectName}/docs/package.json`, data)
	
	writeFile(`${projectName}/example/src/App.vue`, data)
	writeFile(`${projectName}/example/src/main.ts`, data)
	writeFile(`${projectName}/example/package.json`, data)
	writeFile(`${projectName}/example/vite.config.ts`, data)
	writeFile(`${projectName}/example/tsconfig.json`, data)
	writeFile(`${projectName}/example/src/utils/request.ts`, data)
	
	writeFile(`${projectName}/packages/components/vite.config.ts`, data)
	writeFile(`${projectName}/packages/components/tooltip/src/config.ts`, data)
	writeFile(`${projectName}/packages/components/tooltip/index.ts`, data)
	writeFile(`${projectName}/packages/components/README.md`, data)
	writeFile(`${projectName}/packages/components/package.json`, data)
	writeFile(`${projectName}/packages/components/CHANGELOG.md`, data)
	writeFile(`${projectName}/packages/theme-chalk/package.json`, data)
	writeFile(`${projectName}/packages/theme-chalk/variable.less`, data)
	writeFile(`${projectName}/packages/utils/src/resolver.ts`, data)
	writeFile(`${projectName}/packages/utils/README.md`, data)
	writeFile(`${projectName}/packages/utils/package.json`, data)
	writeFile(`${projectName}/packages/utils/CHANGELOG.md`, data)
	
	log.outCyanLog(`项目名：${projectName} 配置重写成功！`)
}


module.exports = {
	convertFirstUpper,
	getCamelName,
	writeFile,
	copyFolder,
	createSuccessCallback
}