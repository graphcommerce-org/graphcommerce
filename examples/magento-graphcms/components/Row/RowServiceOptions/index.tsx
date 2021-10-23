import RichText from '@graphcommerce/graphcms-ui/RichText'
import {
  IconBlock,
  IconBlocks,
  iconChat,
  iconEmail,
  iconPhone,
  SvgImage,
} from '@graphcommerce/next-ui'
import { Link } from '@material-ui/core'
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

        const hrefTitle = serviceOption.url.includes(':')
          ? serviceOption.url.split(':').pop() ?? ''
          : serviceOption.url

        return (
          <PageLink key={serviceOption.title} href={serviceOption.url} passHref>
            <IconBlock
              title={serviceOption.title}
              icon={
                <>
                  {iconTitle === 'e-mail' && (
                    <SvgImage src={iconEmail} alt='phone' loading='eager' />
                  )}
                  {iconTitle === 'phone' && (
                    <SvgImage src={iconPhone} alt='phone' loading='eager' />
                  )}
                  {iconTitle === 'chat' && <SvgImage src={iconChat} alt='phone' loading='eager' />}
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
