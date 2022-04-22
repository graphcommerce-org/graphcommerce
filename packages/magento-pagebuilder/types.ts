import React from 'react'

export type ContentTypeConfig<T extends string = string> = {
  contentType: T
  appearance: string | null
  children: ContentTypeConfig<string>[]
}

export type ConfigAggregator<
  Config extends ContentTypeConfig<string> = ContentTypeConfig<string>,
  R extends Record<string, unknown> = Record<string, unknown>,
> = (node: HTMLElement, config: Config) => R

export type ContentType<Config extends ContentTypeConfig<string>, R> = {
  configAggregator: ConfigAggregator<Config, R>
  component: React.FC<Config & R>
}
