import { useApolloClient } from '@graphcommerce/graphql'
import {
  useStoryblokState as useStoryblokStateBase,
  type ISbStoryData,
  type SbBlokData,
} from '@storyblok/react'
import { useEffect, useRef, useState } from 'react'
import { fetchStory } from './fetch'
import { resolveStoryblokProducts } from './resolveProducts'

export type UseStoryblokStateOptions = {
  /**
   * Skip the bridge subscription and client-side product resolution. Pass
   * `true` outside the Storyblok Visual Editor — `initialStory` is already
   * fully resolved by `fetchStory` in `getStaticProps`.
   */
  skip?: boolean
  /**
   * Storyblok language code the Visual Editor is currently showing. When
   * different from `initialStory`'s language, the hook refetches the story
   * in this language on mount so the editor preview matches the editor's
   * sidebar selection regardless of which GraphCommerce storefront the page
   * renders in. Empty string means "Storyblok-default language".
   */
  editorLanguage?: string
}

/**
 * Wraps `useStoryblokState` and resolves product data for `row_product` bloks client-side. This
 * enables live product previews in the Storyblok visual editor when `magento_product_skus` or
 * `magento_category_id` fields are changed.
 *
 * The generic `T` lets the caller narrow the returned `content` to an auto-generated Storyblok
 * content type.
 */
export function useStoryblokState<T = SbBlokData>(
  initialStory: ISbStoryData | null,
  options: UseStoryblokStateOptions = {},
): ISbStoryData<T> | null {
  const { skip = false, editorLanguage } = options
  const story = useStoryblokStateBase(initialStory, { resolveLinks: 'story' })
  const client = useApolloClient()
  const [resolvedStory, setResolvedStory] = useState(story)
  const prevStoryRef = useRef(story)

  // Editor language refetch: Storyblok's bridge doesn't proactively push
  // content on language switches (only on field edits), and preview cookies
  // can't reach getStaticProps from third-party iframes. So when the editor's
  // language differs from the initial SSR fetch we refetch client-side once.
  useEffect(() => {
    if (skip || editorLanguage === undefined || !initialStory?.full_slug) return
    const target = editorLanguage || 'default'
    const current = initialStory.lang ?? 'default'
    if (target === current) return

    // Storyblok's `full_slug` is prefixed with the language folder (e.g.
    // `nl/home`). Strip it so the refetch targets the canonical story
    // regardless of which language we're switching to.
    const lang = initialStory.lang
    const baseSlug =
      lang && lang !== 'default' && initialStory.full_slug.startsWith(`${lang}/`)
        ? initialStory.full_slug.slice(lang.length + 1)
        : initialStory.full_slug

    let cancelled = false
    fetchStory(baseSlug, { preview: true, language: editorLanguage }, client).then(
      (result) => {
        if (cancelled) return
        const fetched = result.data?.story
        if (!fetched) return
        prevStoryRef.current = fetched
        setResolvedStory(fetched as typeof story)
      },
    )
    return () => {
      cancelled = true
    }
  }, [skip, editorLanguage, initialStory, client])

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
  return (finalStory as ISbStoryData<T> | null) ?? null
}
