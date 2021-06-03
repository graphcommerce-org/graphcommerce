import PageLink from 'next/link'
import React from 'react'
import Button from '../Button'
import FullPageMessage from '../FullPageMessage'
import SvgImage from '../SvgImage'
import { iconPersonAltBig } from '../icons'

type MessageAuthRequiredProps = {
  signInHref: string
  signUpHref: string
  icon?: React.ReactNode
  title?: string
  description?: string
}

export default function MessageAuthRequired(props: MessageAuthRequiredProps) {
  const { title, description, icon, signUpHref, signInHref } = props

  return (
    <FullPageMessage
      title={title ?? 'You must be authenticated to view this page'}
      description={description}
      icon={icon ?? <SvgImage src={iconPersonAltBig} size={148} alt='person' />}
      button={
        <PageLink href={signInHref} passHref>
          <Button variant='contained' color='primary' text='bold' size='large'>
            Login
          </Button>
        </PageLink>
      }
      altButton={
        <PageLink href={signUpHref} passHref>
          <Button variant='text' color='primary'>
            Or create an account
          </Button>
        </PageLink>
      }
    />
  )
}
