import js from '@eslint/js'
import path from 'node:path'
import prettier from 'eslint-plugin-prettier'
import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]
