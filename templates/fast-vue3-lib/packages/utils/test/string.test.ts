import { kebabCase } from '../src/string'

test('kebabCase', () => {
  expect(kebabCase('componentName')).toBe('component-name')
})
