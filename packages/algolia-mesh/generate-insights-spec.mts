import yaml from 'js-yaml'
import { writeFile, readFile } from 'node:fs/promises'
import { OpenAPIV3 } from 'openapi-types'
import prettier from 'prettier'
import conf from '@graphcommerce/prettier-config-pwa'

const response = await fetch(
  'https://raw.githubusercontent.com/algolia/api-clients-automation/main/specs/bundled/insights.yml',
)

const openApiSchema = yaml.load(await response.text()) as OpenAPIV3.Document

const allMethods = [
  OpenAPIV3.HttpMethods.TRACE,
  OpenAPIV3.HttpMethods.POST,
  OpenAPIV3.HttpMethods.PUT,
  OpenAPIV3.HttpMethods.GET,
  OpenAPIV3.HttpMethods.DELETE,
  OpenAPIV3.HttpMethods.PATCH,
  OpenAPIV3.HttpMethods.OPTIONS,
  OpenAPIV3.HttpMethods.HEAD,
]

const { info, openapi, components, tags, ...rest } = openApiSchema

function filterPaths(
  paths: OpenAPIV3.PathsObject,
  allow: Record<string, OpenAPIV3.HttpMethods[]>,
): OpenAPIV3.PathsObject {
  const allowedEntries = Object.entries(allow)

  return Object.fromEntries(
    Object.entries(paths)
      .map(([path, pathItem]) => {
        if (!pathItem) return [path, pathItem]
        const newValue = pathItem

        const [allowedPath, allowedMethods] =
          allowedEntries.find(([allowedPath]) => allowedPath === path) ?? []

        if (!allowedPath || !allowedMethods) return [path, undefined]

        allMethods
          .filter((method) => !allowedMethods.includes(method))
          .forEach((method) => {
            newValue[method] = undefined
          })

        return [path, newValue]
      })
      .filter(([path, pathItem]) => {
        if (!pathItem) return false
        if (allMethods.every((key) => !pathItem[key])) return false
        return true
      }),
  )
}

const newSchema: OpenAPIV3.Document = {
  openapi,
  info,
  paths: filterPaths(openApiSchema.paths, { '/1/events': [OpenAPIV3.HttpMethods.GET] }),
  components,
}

await writeFile(
  './algolia-insights-spec.yaml',
  await prettier.format(JSON.stringify(newSchema), {
    parser: 'json',
    ...conf,
  }),
)
