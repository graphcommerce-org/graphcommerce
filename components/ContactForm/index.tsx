import React from 'react'
import dynamic from 'next/dynamic'
import Skeleton from '@material-ui/lab/Skeleton'
import useContactStyles from './useContactStyles'

/**
 * The contact form is importing a lot of code to make it work:
 * GraphQL Mutation, ApolloClient, react-hook-form
 *
 * Because we don't want this in our main bundle we dynamically load this.
 */
const ContactFormLoader = dynamic(() => import('./ContactForm'), {
  ssr: false,
  loading: () => {
    const classes = useContactStyles()
    return (
      <div className={classes.form}>
        <Skeleton animation='wave' variant='rect' className={classes.name} height={60.625} />
        <Skeleton animation='wave' variant='rect' className={classes.email} height={60.625} />
        <Skeleton animation='wave' variant='rect' className={classes.phoneNumber} height={60.625} />
        <Skeleton animation='wave' variant='rect' className={classes.subject} height={60.625} />
        <Skeleton animation='wave' variant='rect' className={classes.message} height={273.375} />
        <Skeleton animation='wave' variant='rect' className={classes.submit} />
      </div>
    )
  },
})

export default ContactFormLoader
