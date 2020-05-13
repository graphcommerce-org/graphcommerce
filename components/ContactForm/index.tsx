import React, { useRef } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import AsyncComponent from 'components/AsyncComponent'
import useContactStyles from './useContactStyles'

const ContactFormLoader: React.FC = ({ children }) => {
  const classes = useContactStyles()
  const ref = useRef<HTMLDivElement>(null)
  return (
    <AsyncComponent
      loader={() => import('./ContactForm')}
      measureRef={ref}
      skeleton={
        <>
          {children}
          <div className={classes.form} ref={ref}>
            <Skeleton animation='wave' variant='rect' className={classes.name} height={64.6} />
            <Skeleton animation='wave' variant='rect' className={classes.email} height={64.6} />
            <Skeleton
              animation='wave'
              variant='rect'
              className={classes.phoneNumber}
              height={64.6}
            />
            <Skeleton animation='wave' variant='rect' className={classes.subject} height={64.6} />
            <Skeleton animation='wave' variant='rect' className={classes.message} height='100%' />
            <Skeleton animation='wave' variant='rect' className={classes.submit} height={64.6} />
          </div>
        </>
      }
    >
      {children}
    </AsyncComponent>
  )
}

export default ContactFormLoader
