import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript'

export interface DirectiveConfig {
  [directive: string]: {
    [argument: string]: string | string[] | DirectiveObjectArguments
  }
}

export interface DirectiveObjectArguments {
  [matched: string]: string | string[]
}

export interface MarkdownDocsPluginConfig extends TypeScriptPluginConfig {
  markdown: boolean
}
