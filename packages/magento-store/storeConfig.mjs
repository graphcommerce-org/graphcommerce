/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
import fs from 'fs/promises'
import path from 'path'

/**
 * @param {import('./StoreConfigEnv.gql').StoreConfigEnvQuery} data
 * @param {string} prefix
 * @returns {Record<string, unknown>}
 */
function flattenQuery(data, prefix) {
  let newobj = {}

  function traverse(o, p, isArrayItem) {
    for (const f in o) {
      if (o[f] && typeof o[f] === 'object') {
        if (Array.isArray(o[f])) {
          // array
          newobj = traverse(o[f], (p ? `${p}_` : '') + f, true)
        } else {
          if (isArrayItem) {
            const strinKey = o[f]?.key?.toString().toUpperCase()
            const key = `_${strinKey}` ?? `[${f}]`

            newobj = traverse(o[f], `${p || ''}${key}`)
          }
          // array item object
          else newobj = traverse(o[f], (p ? `${p}_` : '') + f) // object
        }
      } else {
        if (isArrayItem) {
          // array item primitive
          newobj[`${p}[${f}]`] = o[f]
        } else {
          const key = typeof p === 'string' && p.startsWith('_') ? f : `${p}_${f}`

          newobj[key] = String(o[f]) // primitive
        }
      }
    }
    return newobj
  }

  return traverse(data, prefix)
}

export async function withMagentoConfig() {
  const queryFilePath = path.join(
    path.dirname(import.meta.url.replace('file:', '')),
    'StoreConfigEnv.graphql',
  )
  const query = await fs.readFile(queryFilePath, 'utf8')

  const req = await fetch(process.env.MAGENTO_ENDPOINT, {
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({ query }),
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  })

  /** @type {{ data: import('./StoreConfigEnv.gql').StoreConfigEnvQuery }} */
  const res = await req.json()

  // Assign all entries to process.env
  Object.entries(flattenQuery(res.data)).forEach(([key, value]) => {
    process.env[key] = value
  })
}
