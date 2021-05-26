import Button from '@reachdigital/next-ui/Button'
import FullPageMessage from '@reachdigital/next-ui/FullPageMessage'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconPersonAltBig } from '@reachdigital/next-ui/icons'
import React from 'react'

export default function MessageAuthRequired() {
  return (
    <FullPageMessage
      title='You must be authenticated to view this page'
      icon={<SvgImage src={iconPersonAltBig} size={148} alt='person' />}
      button={
        <Button variant='contained' color='primary' text='bold' size='large'>
          Login
        </Button>
      }
      altButton={
        <Button variant='text' color='primary'>
          Or create an account
        </Button>
      }
    />
  )
}
