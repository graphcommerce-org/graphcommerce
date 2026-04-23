import { loadConfig } from '@graphcommerce/next-config/loadConfig'
import { defineConfig } from 'storyblok/config'

const gcConfig = loadConfig(process.cwd())

export default defineConfig({
  space: gcConfig.storyblok.spaceId,
  region: 'eu',
  modules: {
    components: {
      pull: {
        separateFiles: true,
      },
    },
    types: {
      generate: {
        typePrefix: 'Storyblok',
      },
    },
  },
})
