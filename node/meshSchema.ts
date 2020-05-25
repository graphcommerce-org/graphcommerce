import '@graphql-mesh/transform-filter-schema'
import '@graphql-mesh/graphql'
import '@graphql-mesh/merger-stitching'
import '@graphql-mesh/transform-snapshot'

import { getMesh, processConfig } from '@graphql-mesh/runtime'
import meshrc from '../.meshrc.json'

if (!process.env.GRAPHCMS || !process.env.GRAPHCMS_BEARER)
  throw new Error(
    `GRAPHCMS_BEARER:${process.env.GRAPHCMS} or GRAPHCMS ${process.env.GRAPHCMS} env variable not set`,
  )

function injectEnv<T extends object>(json: T): T {
  let content = JSON.stringify(json)
  if (typeof process !== 'undefined' && 'env' in process) {
    content = content.replace(/\$\{(.*?)\}/g, (_, variable) => {
      let varName = variable
      let defaultValue = ''

      if (variable.includes(':')) {
        const spl = variable.split(':')
        varName = spl.shift()
        defaultValue = spl.join(':')
      }

      return process.env[varName] || defaultValue
    })
  }
  return JSON.parse(content)
}

export const mesh = (async () => getMesh(await processConfig(injectEnv(meshrc))))()

const meshSchema = mesh.then(({ schema }) => schema)

export default meshSchema
