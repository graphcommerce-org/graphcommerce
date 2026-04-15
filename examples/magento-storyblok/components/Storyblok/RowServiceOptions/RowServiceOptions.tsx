import { RichText } from '@graphcommerce/storyblok-ui'
import { IconBlock, IconBlocks, iconChat, iconEmail, iconPhone, IconSvg } from '@graphcommerce/next-ui'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import type { StoryblokRowServiceOptions as RowServiceOptionsBlok } from '../types'

export function RowServiceOptions({ blok }: { blok: RowServiceOptionsBlok }) {
  return (
    <IconBlocks
      title={blok.title ?? ''}
      {...storyblokEditable(blok as unknown as SbBlokData)}
    >
      {blok.service_options?.map((option) => {
        const iconTitle = (option.title ?? '').toLowerCase()

        return (
          <IconBlock
            {...storyblokEditable(option as unknown as SbBlokData)}
            key={option._uid}
            href={option.url ?? ''}
            title={option.title ?? ''}
            icon={
              <>
                {iconTitle === 'e-mail' && <IconSvg src={iconEmail} size='large' />}
                {iconTitle === 'phone' && <IconSvg src={iconPhone} size='large' />}
                {iconTitle === 'chat' && <IconSvg src={iconChat} size='large' />}
              </>
            }
          >
            {option.description ? <RichText content={option.description} /> : undefined}
          </IconBlock>
        )
      })}
    </IconBlocks>
  )
}
