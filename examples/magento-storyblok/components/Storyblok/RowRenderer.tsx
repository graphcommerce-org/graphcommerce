import { LazyHydrate } from '@graphcommerce/next-ui'
import { StoryblokComponent, type SbBlokData } from '@storyblok/react'
import { memo } from 'react'
import type { StoryblokBlokMap } from './types'

type BlokRenderer = {
  [K in keyof StoryblokBlokMap]?: React.FC<{ blok: StoryblokBlokMap[K] }>
}

type RenderableBlok = { _uid?: string; component?: string }

export type RowRendererProps = {
  content: ReadonlyArray<RenderableBlok>
  renderer?: BlokRenderer
  loadingEager?: number
}

/**
 * Thin wrapper around StoryblokComponent that adds LazyHydrate and per-page component overrides via
 * the `renderer` prop.
 */
// eslint-disable-next-line react/display-name
export const RowRenderer = memo<RowRendererProps>(({ content, renderer, loadingEager = 2 }) => (
  <>
    {content.map((blok, index) => {
      const Override = blok.component ? renderer?.[blok.component as keyof BlokRenderer] : undefined

      return (
        <LazyHydrate
          key={blok._uid}
          hydrated={index < loadingEager ? true : undefined}
          height={500}
        >
          {Override ? (
            <Override blok={blok as never} />
          ) : (
            <StoryblokComponent blok={blok as SbBlokData} />
          )}
        </LazyHydrate>
      )
    })}
  </>
))

export type { BlokRenderer }
