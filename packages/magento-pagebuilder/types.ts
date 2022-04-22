import React from 'react'

export type ContentTypeConfigChildren = Array<ContentTypeConfigWithString>

export type ContentTypeConfigWithString = string | null | ContentTypeConfig

export type ContentTypeConfig<T extends string = string> = {
  contentType: T
  appearance: string | null
  children?: ContentTypeConfigChildren
}

export type ConfigAggregator<
  Config extends ContentTypeConfig = ContentTypeConfig,
  R extends Record<string, unknown> = Record<string, unknown>,
> = (node: HTMLElement, config: Config) => R

export type RenderComponent<T extends string = string> = React.FC<{
  contentType: T
  appearance: string | null
  children: React.ReactNode
}>

export type GetRenderComponent = (contentType: string) => RenderComponent
