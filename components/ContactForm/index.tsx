import React from 'react'
import dynamic from 'next/dynamic'
import Skeleton from '@material-ui/lab/Skeleton'
import useContactStyles from './useContactStyles'

const Loading = () => {
  const classes = useContactStyles()
  return (
    <div className={classes.form}>
      <Skeleton animation='wave' variant='rect' className={classes.name} height={64.6} />
      <Skeleton animation='wave' variant='rect' className={classes.email} height={64.6} />
      <Skeleton animation='wave' variant='rect' className={classes.phoneNumber} height={64.6} />
      <Skeleton animation='wave' variant='rect' className={classes.subject} height={64.6} />
      <Skeleton animation='wave' variant='rect' className={classes.message} height='100%' />
      <Skeleton animation='wave' variant='rect' className={classes.submit} height={64.6} />
    </div>
  )
}

const ContactFormLoader = dynamic(() => import('./ContactForm'), {
  ssr: false,
  loading: Loading,
})

export default ContactFormLoader
