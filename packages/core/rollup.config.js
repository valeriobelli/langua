import alias from '@rollup/plugin-alias'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from 'path'
import { defineConfig } from 'rollup'
import swc from 'rollup-plugin-swc3'

const root = __dirname

const createConfig = ({ dir, format }) =>
  defineConfig({
    input: 'src/index.ts',
    output: {
      dir,
      exports: 'named',
      format,
    },
    plugins: [
      alias({
        entries: {
          '~': path.resolve(root, 'src'),
        },
      }),
      nodeResolve({
        extensions: ['.ts'],
      }),
      swc({
        tsconfig: path.resolve(root, 'tsconfig.code.json'),
      }),
    ],
  })

export default [createConfig({ dir: 'lib', format: 'cjs' }), createConfig({ dir: 'esm', format: 'esm' })]
