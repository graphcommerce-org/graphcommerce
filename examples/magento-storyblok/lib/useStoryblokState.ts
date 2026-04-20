import { useApolloClient } from '@graphcommerce/graphql'
import { useStoryblokState as useStoryblokStateBase, type ISbStoryData } from '@storyblok/react'
import { useEffect, useRef, useState } from 'react'
import type { StoryblokPage } from '../components/Storyblok/types'
import { resolveStoryblokProducts } from './resolveStoryblokProducts'

/**
 * Wraps useStoryblokState for page content and resolves product data for row_product bloks
 * client-side. This enables live product previews in the Storyblok visual editor when
 * magento_product_skus or magento_category_id fields are changed.
 */
export function useStoryblokState(
  initialStory: ISbStoryData | null,
): ISbStoryData<StoryblokPage> | null {
  const story = useStoryblokStateBase(initialStory)
  const client = useApolloClient()
  const [resolvedStory, setResolvedStory] = useState(story)
  const prevStoryRef = useRef(story)

  useEffect(() => {
    // Outside the visual editor, story never changes so the effect is a no-op.
    if (prevStoryRef.current === story) return
    prevStoryRef.current = story

    const body = (story?.content as { body?: unknown[] } | undefined)?.body
    if (!body) return

    const cloned = JSON.parse(JSON.stringify(story)) as typeof story
    resolveStoryblokProducts((cloned!.content as { body: never }).body, client).then(() =>
      setResolvedStory(cloned),
    )
  }, [story, client])

  return resolvedStory?.content?.component === 'page'
    ? (resolvedStory as ISbStoryData<StoryblokPage>)
    : null
}
