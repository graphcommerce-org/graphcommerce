import { RichText } from '@graphcommerce/graphcms-ui'
import {
  IconBlock,
  IconBlocks,
  iconChat,
  iconEmail,
  iconPhone,
  IconSvg,
} from '@graphcommerce/next-ui'
import PageLink from 'next/link'
import { RowServiceOptionsFragment } from './RowServiceOptions.gql'

type RowServiceOptionsProps = RowServiceOptionsFragment

export function RowServiceOptions(props: RowServiceOptionsProps) {
  const { title, serviceOptions } = props

  return (
    <IconBlocks title={title}>
      {serviceOptions.map((serviceOption) => {
        const iconTitle = serviceOption.title.toLowerCase()

        return (
          <PageLink key={serviceOption.title} href={serviceOption.url} passHref>
            <IconBlock
              title={serviceOption.title}
              icon={
                <>
                  {iconTitle === 'e-mail' && <IconSvg src={iconEmail} size='large' />}
                  {iconTitle === 'phone' && <IconSvg src={iconPhone} size='large' />}
                  {iconTitle === 'chat' && <IconSvg src={iconChat} size='large' />}
                </>
              }
            >
              {serviceOption.description ? <RichText {...serviceOption.description} /> : undefined}
            </IconBlock>
          </PageLink>
        )
      })}
    </IconBlocks>
  )
}
