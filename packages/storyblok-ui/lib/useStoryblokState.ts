import { useApolloClient } from '@graphcommerce/graphql'
import {
  useStoryblokState as useStoryblokStateBase,
  type ISbStoryData,
  type SbBlokData,
} from '@storyblok/react'
import { useEffect, useRef, useState } from 'react'
import { resolveStoryblokProducts } from './resolveProducts'

export type UseStoryblokStateOptions = {
  /**
   * Skip the bridge subscription and client-side product resolution. Pass
   * `true` outside the Storyblok Visual Editor — `initialStory` is already
   * fully resolved by `fetchStory` in `getStaticProps`.
   */
  skip?: boolean
}

/**
 * Wraps `useStoryblokState` and resolves product data for `row_product` bloks client-side. This
 * enables live product previews in the Storyblok visual editor when `magento_product_skus` or
 * `magento_category_id` fields are changed.
 *
 * The generic `T` lets the caller narrow the returned `content` to an auto-generated Storyblok
 * content type. The runtime check guards against feeding in a story whose content isn't a `page`.
 */
export function useStoryblokState<T = SbBlokData>(
  initialStory: ISbStoryData | null,
  options: UseStoryblokStateOptions = {},
): ISbStoryData<T> | null {
  const { skip = false } = options
  const story = useStoryblokStateBase(initialStory, { resolveLinks: 'story' })
  const client = useApolloClient()
  const [resolvedStory, setResolvedStory] = useState(story)
  const prevStoryRef = useRef(story)

  useEffect(() => {
    if (skip) return
    if (prevStoryRef.current === story) return
    prevStoryRef.current = story

    const body = (story?.content as { body?: unknown[] } | undefined)?.body
    if (!body) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResolvedStory(story)
      return
    }

    const cloned = JSON.parse(JSON.stringify(story)) as typeof story
    resolveStoryblokProducts((cloned!.content as { body: never }).body, client).then(() =>
      setResolvedStory(cloned),
    )
  }, [skip, story, client])

  const finalStory = skip ? initialStory : resolvedStory

  if (!finalStory) return null
  if (finalStory.content?.component === 'page') {
    return finalStory as ISbStoryData<T>
  }

  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      `useStoryblokState: expected story content of type 'page' but got '${finalStory.content?.component}' for slug '${finalStory.full_slug}'. Use the upstream @storyblok/react useStoryblokState for non-page content.`,
    )
  }
  return null
}
