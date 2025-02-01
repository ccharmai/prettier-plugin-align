import * as prettier from 'prettier'
import { promises as fs } from 'fs'

const plugin = new URL('../dist/index.js', import.meta.url).href

export const format = async (source: string): Promise<string> => {
  return await prettier.format(source, {
    parser: 'typescript',
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    semi: false,
    plugins: [plugin],
  })
}

type Group = 'enum' | 'switch'

const getSource = async (group: Group, type: 'input' | 'output'): Promise<string> => {
  const path = new URL(`./${group}/${type}.ts`, import.meta.url).pathname
  return await fs.readFile(path, 'utf-8')
}

export const getGroup = async (group: Group): Promise<{ input: string; output: string }> => {
  const [input, output] = await Promise.all([
    getSource(group, 'input'),
    getSource(group, 'output'),
  ])

  return { input, output }
}
