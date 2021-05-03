import { Chat, Email, Phone } from '@material-ui/icons'
import RichText from '@reachdigital/graphcms-ui/RichText'
import IconBlocks from '@reachdigital/next-ui/Row/IconBlocks'
import IconBlock from '@reachdigital/next-ui/Row/IconBlocks/IconBlock'
import PageLink from 'next/link'
import React from 'react'
import { RowServiceOptionsFragment } from './RowServiceOptions.gql'

type RowServiceOptionsProps = RowServiceOptionsFragment

export default function RowServiceOptions(props: RowServiceOptionsProps) {
  const { serviceOptionsTitle, serviceOptions } = props

  return (
    <IconBlocks
      title={serviceOptionsTitle}
      options={serviceOptions.map((serviceOption) => {
        const iconTitle = serviceOption.title.toLowerCase()

        return (
          <PageLink key={serviceOption.title} href={serviceOption.url} passHref>
            <IconBlock
              title={serviceOption.title}
              icon={
                <>
                  {iconTitle === 'e-mail' && <Phone color='inherit' />}
                  {iconTitle === 'phone' && <Email color='inherit' />}
                  {iconTitle === 'chat' && <Chat color='inherit' />}
                </>
              }
            >
              {serviceOption.description ? <RichText {...serviceOption.description} /> : undefined}
            </IconBlock>
          </PageLink>
        )
      })}
    />
  )
}
