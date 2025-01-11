'use strict'
module.exports = {
  types: [
    { value: 'feat', name: 'feat:       一个新的特性' },
    { value: 'fix', name: 'fix:        修复一个Bug' },
    { value: 'docs', name: 'docs:       变更的只有文档' },
    { value: 'style', name: 'style:      样式修复' },
    { value: 'refactor', name: 'refactor:   代码重构，注意和特性、修复区分开' },
    { value: 'perf', name: 'perf:       提升性能' },
    { value: 'test', name: 'test:       添加一个测试' },
    { value: 'build', name: 'build:      开发工具变动(构建、脚手架工具等)' },
    { value: 'revert', name: 'revert:     代码回退' }
  ],
  scopes: [
    { name: 'form' },
    { name: 'form-list' },
    { name: 'layout' },
    { name: 'editable' },
    { name: 'table' },
    { name: 'selector' },
    { name: 'utils' },
    { name: 'components' },
    { name: 'build' },
    { name: 'docs' },
    { name: 'example' },
    { name: 'other' }
  ],
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择变更的组件类型(可选):',
    subject: '请简单说明这次变更的内容(必填):',
    body: '详细描述这次变更的内容，使用"|"换行(可选)：\n',
    footer: '是否关联issue，例如：#31, #34(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  allowCustomScopes: true,
  skipQuestions: ['footer'],
  allowBreakingChanges: ['特性', '修复'],
  subjectLimit: 100
}
