import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import watch from 'rollup-plugin-watch';
import { babel } from '@rollup/plugin-babel';

const DIST_DIR = 'dist';
const PUBLIC_DIR = 'public';
const SERVER_PORT = 3000;

const isProduction = process.env.NODE_ENV === 'production';

const serveConfig = process.env.SERVE === 'true' && [
  serve({
    port: SERVER_PORT,
    open: true,
    contentBase: DIST_DIR,
  }),
  livereload({
    watch: DIST_DIR,
    port: SERVER_PORT,
    delay: 1000
  })
] || [];

const watchConfig = process.env.WATCH === 'true' && [
  watch({ dir: PUBLIC_DIR })
] || [];

const terserConfig = isProduction && {
  compress: {
    drop_console: true
  },
  mangle: true
} || {};

export default {
  input: 'src/app.js',
  output: {
    file: `${DIST_DIR}/bundle.min.js`,
    format: 'esm',
    name: 'Portfolio'
  },
  plugins: [
    minifyHTML(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    terser(terserConfig),
    copy({
      targets: [
        { src: `${PUBLIC_DIR}/*`, dest: DIST_DIR },
      ]
    }),
    ...serveConfig,
    ...watchConfig
  ]
};
