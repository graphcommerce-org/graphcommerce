import React from 'react'

export type ContentTypeConfig<T extends string> = { contentType: T }

type ConfigAggregator<Config extends ContentTypeConfig<string>, R> = (
  node: HTMLElement,
  config: Config,
) => R

export type ContentType<Config extends ContentTypeConfig<string>, R> = {
  configAggregator: ConfigAggregator<Config, R>
  component: React.FC<Config & R>
}
