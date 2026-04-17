import { useApolloClient } from '@graphcommerce/graphql'
import { useStoryblokState as useStoryblokStateBase, type ISbStoryData } from '@storyblok/react'
import { useEffect, useRef, useState } from 'react'
import { resolveStoryblokProducts } from './resolveStoryblokProducts'

/**
 * Wraps useStoryblokState and resolves product data for row_product bloks client-side. This enables
 * live product previews in the Storyblok visual editor when magento_product_skus or
 * magento_category_id fields are changed.
 */
export function useStoryblokState<T = void>(initialStory: ISbStoryData<T> | null) {
  const story = useStoryblokStateBase(initialStory)
  const client = useApolloClient()
  const [resolvedStory, setResolvedStory] = useState(story)
  const prevStoryRef = useRef(story)
  // body only exists on page stories, not on e.g. global config
  const body = (story?.content as Record<string, unknown> | undefined)?.body as
    | unknown[]
    | undefined

  useEffect(() => {
    // Outside the visual editor, story never changes so the effect is a no-op.
    if (prevStoryRef.current === story) return
    prevStoryRef.current = story
    if (!body) return

    const cloned = JSON.parse(JSON.stringify(story)) as typeof story
    resolveStoryblokProducts((cloned!.content as Record<string, unknown>).body as never, client).then(
      () => setResolvedStory(cloned),
    )
  }, [story, client, body])

  if (!body) return story

  return resolvedStory
}
