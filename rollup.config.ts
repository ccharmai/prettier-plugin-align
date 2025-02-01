import type { RollupOptions } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const config: RollupOptions = {
  input: 'src/index.ts',
  output: { dir: 'dist', format: 'esm' },
  external: ['prettier', 'prettier/plugins/babel', 'prettier/plugins/typescript', 'prettier/plugins/estree'],
  plugins: [commonjs(), typescript(), terser()],
}

export default config
