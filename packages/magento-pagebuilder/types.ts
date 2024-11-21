import type React from 'react'

export type ContentTypeConfigChildren = Array<ContentTypeConfigWithString>

export type ContentTypeConfigWithString = string | null | ContentTypeConfig

export type ContentTypeConfig<T extends string = string> = {
  contentType: T
  appearance: string | null
  children: ContentTypeConfigChildren
}

export type ParseProps<
  Config extends ContentTypeConfig = ContentTypeConfig,
  R extends Record<string, unknown> = Record<string, unknown>,
> = (node: HTMLElement, config: Config) => R

export type ContentType<Config extends ContentTypeConfig, R extends Record<string, unknown>> = {
  configAggregator: ParseProps<Config, R>
  component: React.FC<Config & R>
}

export type RenderComponent<T extends string = string> = React.FC<
  Omit<ContentTypeConfig<T>, 'children'> & { children: React.ReactNode }
>

export type GetRenderComponent = (contentType: string) => RenderComponent
