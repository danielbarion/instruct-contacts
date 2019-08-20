import browsersync from 'rollup-plugin-browsersync'
import babel from 'rollup-plugin-babel'
import copy from 'rollup-plugin-copy'
import html from 'rollup-plugin-html-scaffold'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import stylus from 'rollup-plugin-stylus-to-css'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'
import { string } from 'rollup-plugin-string'
import { version } from './package.json'

const appBundle = `app-${new Date().getTime()}.js`;

export default [
  {
    input: ['src/index.js'],
    output: {
      file: `build/${appBundle}`,
      format: 'umd',
      sourcemap: true,
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
      html({
        input: 'index.html',
        output: 'index.html',
        template: { appBundle }
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.app.version': version,
        'process.app.enviroment': 'localhost front-end'
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
      copy({
        targets: [
          { src: 'assets', dest: 'build/' }
        ],
        verbose: true
      }),
      browsersync({
        server: 'build',
        watch: true,
        port: 3000,
        ui: {
          port: 3001,
        },
      }),
    ],
  }
];
