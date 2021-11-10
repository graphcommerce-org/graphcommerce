import RichText from '@graphcommerce/graphcms-ui/RichText'
import {
  IconBlock,
  IconBlocks,
  iconChat,
  iconEmail,
  iconPhone,
  SvgImageSimple,
} from '@graphcommerce/next-ui'
import PageLink from 'next/link'
import React from 'react'
import { RowServiceOptionsFragment } from './RowServiceOptions.gql'

type RowServiceOptionsProps = RowServiceOptionsFragment

export default function RowServiceOptions(props: RowServiceOptionsProps) {
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
                  {iconTitle === 'e-mail' && <SvgImageSimple src={iconEmail} size='large' />}
                  {iconTitle === 'phone' && <SvgImageSimple src={iconPhone} size='large' />}
                  {iconTitle === 'chat' && <SvgImageSimple src={iconChat} size='large' />}
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
