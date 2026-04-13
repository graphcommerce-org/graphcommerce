import { defineConfig } from 'storyblok/config'

export default defineConfig({
  space: '291439709879423',
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
