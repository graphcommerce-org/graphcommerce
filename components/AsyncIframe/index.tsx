import AsyncComponent from 'components/AsyncComponent'
import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { AsyncIframeProps } from './AsyncIframe'

const AsyncIframe: React.FC<AsyncIframeProps> = (props) => {
  return (
    <AsyncComponent
      {...props}
      loader={() => import('./AsyncIframe')}
      skeleton={(ref) => (
        <Skeleton animation='wave' variant='rect' height='100%' {...props} ref={ref} />
      )}
    />
  )
}

export default AsyncIframe
