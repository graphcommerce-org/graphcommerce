import { StoryblokComponent, storyblokEditable, type SbBlokData } from '@storyblok/react'

type PageBlok = SbBlokData & {
  body?: SbBlokData[]
}

export function StoryblokPage({ blok }: { blok: PageBlok }) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        // eslint-disable-next-line no-underscore-dangle
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  )
}
