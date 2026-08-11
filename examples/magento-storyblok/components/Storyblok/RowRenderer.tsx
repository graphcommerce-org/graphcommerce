import { LazyHydrate } from '@graphcommerce/next-ui'
import { StoryblokComponent, type SbBlokData } from '@storyblok/react'
import { useRouter } from 'next/router'
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
export const RowRenderer = memo<RowRendererProps>(({ content, renderer, loadingEager = 2 }) => {
  // Disable LazyHydrate in the Storyblok Visual Editor. Its interplay with
  // the editor's live bridge updates is unreliable — rows intermittently stay
  // unhydrated and editors end up seeing blank content until they force a
  // re-render by clicking around. Performance optimization isn't relevant in the
  // editor, so we simply hydrate everything up front there.
  const isEditor = Boolean(useRouter().query._storyblok)

  return (
    <>
      {content.map((blok, index) => {
        const Override = blok.component
          ? renderer?.[blok.component as keyof BlokRenderer]
          : undefined

        return (
          <LazyHydrate
            key={blok._uid}
            hydrated={isEditor || index < loadingEager ? true : undefined}
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
  )
})

export type { BlokRenderer }
