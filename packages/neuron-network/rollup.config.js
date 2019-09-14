import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = `/*!
 * ${pkg.name}
 *
 * @version v${pkg.version}
 */`;

export default commandLineArgs => {
  const configs = [
    // UMD Development
    {
      input: 'src/main.js',
      output: {
        banner,
        name: pkg.name,
        file: pkg.browser,
        format: 'umd'
      },
      plugins: [
        // Uncomment the following 2 lines if your library has external dependencies
        // resolve(), // teach Rollup how to find external modules
        // commonjs(), // so Rollup can convert external modules to an ES module
        babel({
          exclude: ['node_modules/**']
        })
      ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build
    {
      input: 'src/main.js',
      external: [], // indicate which modules should be treated as external
      output: [
        {
          banner,
          file: pkg.main,
          format: 'cjs'
        },
        {
          banner,
          file: pkg.module,
          format: 'es'
        }
      ],
      plugins: [
        babel({
          exclude: ['node_modules/**']
        })
      ]
    }
  ];

  if (commandLineArgs.environment === 'BUILD:production') {
    // UMD Production
    configs.push({
      input: 'src/main.js',
      output: {
        banner,
        name: pkg.name,
        file: `dist/${pkg.name}.umd.min.js`,
        format: 'umd'
      },
      plugins: [
        // Uncomment the following 2 lines if your library has external dependencies
        // resolve(), // teach Rollup how to find external modules
        // commonjs(), // so Rollup can convert external modules to an ES module
        babel({
          exclude: ['node_modules/**']
        }),
        terser({
          output: {
            comments: /^!/
          }
        })
      ]
    });
  }

  return configs;
};
