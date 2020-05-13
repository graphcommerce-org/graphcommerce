import AsyncComponent from 'components/AsyncComponent'
import React, { useRef } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { AsyncIframeProps } from './AsyncIframe'

const AsyncIframe: React.FC<AsyncIframeProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <AsyncComponent
      {...props}
      loader={() => import('./AsyncIframe')}
      measureRef={ref}
      skeleton={<Skeleton animation='wave' variant='rect' height='100%' {...props} ref={ref} />}
    />
  )
}

export default AsyncIframe
