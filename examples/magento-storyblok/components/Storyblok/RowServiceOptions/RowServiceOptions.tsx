import {
  IconBlock,
  IconBlocks,
  iconChat,
  iconEmail,
  iconPhone,
  IconSvg,
} from '@graphcommerce/next-ui'
import { RichText, storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokRowServiceOptions as RowServiceOptionsBlok } from '../types'

export function RowServiceOptions({ blok }: { blok: RowServiceOptionsBlok }) {
  return (
    <IconBlocks title={blok.title ?? ''} {...storyblokEditable(blok)}>
      {blok.service_options?.map((option) => {
        const iconTitle = (option.title ?? '').toLowerCase()

        return (
          <IconBlock
            {...storyblokEditable(option)}
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
