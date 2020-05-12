const path = require('path')
const { compilerOptions } = require('../tsconfig.json')

module.exports = {
  stories: ['../**/*.stories.tsx'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-storysource',
    '@harelpls/storybook-addon-materialui',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: { presets: ['next/babel'] },
        },
      ],
    })

    config.resolve.modules.push(path.resolve(__dirname, '../', compilerOptions.baseUrl))

    config.module.rules.push({
      test: /\.stories\.tsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: { parser: 'typescript' },
        },
      ],
      enforce: 'pre',
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}
