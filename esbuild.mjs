import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

const isWatch = process.argv.includes('--watch');
const isProduction = process.argv.includes('--production');

const entryPoints = [
  'src/extension.ts',
  'src/panels/LogcatPanel.ts',
  'src/panels/EmulatorScreenPanel.ts',
];

const ctx = await esbuild.context({
  entryPoints,
  bundle: true,
  outdir: 'out',
  format: 'cjs',
  platform: 'node',
  target: 'node20',
  sourcemap: !isProduction,
  minify: isProduction,
  external: ['vscode'],
  tsconfig: './tsconfig.json',
  define: {
    'process.env.NODE_ENV': isProduction ? '"production"' : '"development"',
  },
});

if (isWatch) {
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await ctx.rebuild();
  console.log('Build complete.');
}
