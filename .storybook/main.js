const path = require('path')

module.exports = {
  stories: ['../**/*.stories.tsx'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-storysource',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('babel-preset-react-app')],
          },
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    })

    config.resolve.alias['~'] = path.resolve(__dirname, '..')

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
