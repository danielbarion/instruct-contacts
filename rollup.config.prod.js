import analyze from 'rollup-plugin-analyzer'
import babel from 'rollup-plugin-babel'
import copy from 'rollup-plugin-copy'
import filesize from 'rollup-plugin-filesize'
import html from 'rollup-plugin-html-scaffold'
import resolve from 'rollup-plugin-node-resolve'
import stylus from 'rollup-plugin-stylus-to-css'
import postcss from 'rollup-plugin-postcss'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'
import svg from 'rollup-plugin-svg'
import { string } from 'rollup-plugin-string'
import { version } from './package.json'
import { terser } from 'rollup-plugin-terser'

const appBundle = `app-${new Date().getTime()}.js`

export default [
  {
    input: ['src/index.js'],
    output: {
      file: `build/${appBundle}`,
      format: 'umd',
      sourcemap: false,
    },
    plugins: [
      progress(),
      alias({
        resolve: ['.styl', '.css', 'svg'],
        modules: `${__dirname}/src/modules`,
        components: `${__dirname}/src/components`,
        utils: `${__dirname}/src/utils`,
        assets: `${__dirname}/assets`,
      }),
      svg(),
      html({
        input: 'index.html',
        output: 'index.html',
        template: { appBundle },
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.app.version': version,
        'process.app.enviroment': 'production',
      }),
      string({ include: '**/*.html' }),
      stylus(),
      postcss({
        modules: true,
        include: '**/*.css',
        extensions: ['.css', '.sss', '.stylus', '.styl', '.pcss', '.scss']
      }),
      resolve(),
      babel(),
      terser({ sourcemap: false }),
      analyze(),
      filesize(),
      copy({
        targets: [
          { src: 'assets', dest: 'build/' }
        ],
        verbose: true
      }),
    ],
  }
]
