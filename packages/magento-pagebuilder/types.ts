import React from 'react'

export type ContentTypeConfigChildren = Array<string | null | ContentTypeConfig>

export type ContentTypeConfig<T extends string = string> = {
  contentType: T
  appearance: string | null
  children?: ContentTypeConfigChildren
}

export type ConfigAggregator<
  Config extends ContentTypeConfig = ContentTypeConfig,
  R extends Record<string, unknown> = Record<string, unknown>,
> = (node: HTMLElement, config: Config) => R

export type ContentType<Config extends ContentTypeConfig, R extends Record<string, unknown>> = {
  configAggregator: ConfigAggregator<Config, R>
  component: React.FC<Config & R>
}

export type GetRenderType = (contentType: string) => React.FC<ContentTypeConfig> | undefined
