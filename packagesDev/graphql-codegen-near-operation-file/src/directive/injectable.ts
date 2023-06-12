/* eslint-disable react/destructuring-assignment */
import { Types } from '@graphql-codegen/plugin-helpers'
import { visit, DocumentNode, FragmentSpreadNode, FragmentDefinitionNode, Kind } from 'graphql'

function isFragment(document: DocumentNode) {
  let is = false
  visit(document, {
    FragmentDefinition: () => {
      is = true
    },
  })
  return is
}

function hasInjectableDirective(document: DocumentNode) {
  let is = false
  visit(document, {
    Directive: (node) => {
      if (!is && node.name.value === 'injectable') is = true
    },
  })
  return is && isFragment
}

function hasInjectDirective(document: DocumentNode) {
  let is = false
  visit(document, {
    Directive: (node) => {
      if (!is && node.name.value === 'inject') is = true
    },
  })
  return is && isFragment
}

type Inject = { into: string[]; fragment: FragmentDefinitionNode }

function throwInjectError(conf: Partial<Inject>, message: string) {
  const val = conf.into?.map((v) => `"${v}"`)

  throw Error(
    `${message}
  fragment ${conf.fragment?.name.value} on ${conf.fragment?.typeCondition.name.value} @inject(into: [${val}]) { ... }`,
  )
}

function assertValidInject(injectVal: Partial<Inject>): asserts injectVal is Inject {
  const { into, fragment } = injectVal
  if (!fragment || into?.length === 0) throwInjectError(injectVal, 'Invalid inject')
}

function getInjectConf(document: DocumentNode): Inject {
  if (!hasInjectDirective(document)) throw Error('')

  const conf: Partial<Inject> = { into: [] }
  visit(document, {
    Directive: (node) => {
      if (node.name.value !== 'inject') return false
      visit(node, {
        Argument: (arg) => {
          if (arg.name.value !== 'into') return false
          visit(arg, {
            ListValue: (list) => {
              list.values.forEach((value) => {
                visit(value, {
                  StringValue: (string) => {
                    conf.into?.push(string.value)
                  },
                })
              })
            },
          })
          return undefined
        },
      })
      return null
    },
    FragmentDefinition: (node) => {
      conf.fragment = node
    },
  })
  assertValidInject(conf)
  return conf
}

function injectInjectable(injectables: DocumentNode[], injector: DocumentNode) {
  const injectVal = getInjectConf(injector)
  const { into, fragment } = injectVal

  into.forEach((target) => {
    let found = false
    injectables.forEach((injectable) => {
      visit(injectable, {
        FragmentDefinition: (frag) => {
          if (frag.name.value === target) {
            found = true

            const spread: FragmentSpreadNode = {
              kind: Kind.FRAGMENT_SPREAD,
              name: { kind: Kind.NAME, value: fragment.name.value },
              directives: [],
            }
            frag.selectionSet.selections = [...frag.selectionSet.selections, spread]
          }
        },
      })
    })
    if (!found)
      throwInjectError(
        injectVal,
        `fragment ${target} @injectable { ... } can not be found or isn't injectable`,
      )
  })
}

export function injectableDirective(documentFiles: Types.DocumentFile[]) {
  const documents = documentFiles
    .map(({ document }) => document)
    .filter((doc) => doc) as DocumentNode[]

  const injectables = documents.filter((d) => isFragment(d) && hasInjectableDirective(d))

  const injectors = documents.filter((d) => isFragment(d) && hasInjectDirective(d))

  injectors.forEach((d) => injectInjectable(injectables, d))

  return documentFiles
}
