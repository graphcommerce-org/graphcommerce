import { LazyHydrate } from '@graphcommerce/next-ui'
import { StoryblokComponent, type SbBlokData } from '@storyblok/react'
import { memo } from 'react'

type BlokComponent = React.FC<{ blok: SbBlokData }>

type BlokRenderer = Partial<Record<string, BlokComponent>>

export type RowRendererProps = {
  content: SbBlokData[]
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
      const Override = blok.component ? renderer?.[blok.component] : undefined

      return (
        <LazyHydrate
          key={blok._uid}
          hydrated={index < loadingEager ? true : undefined}
          height={500}
        >
          {Override ? <Override blok={blok} /> : <StoryblokComponent blok={blok} />}
        </LazyHydrate>
      )
    })}
  </>
))

export type { BlokRenderer }
