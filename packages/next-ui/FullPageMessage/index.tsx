import { Container, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React from 'react'
import { responsiveVal } from '../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      alignItems: 'center',
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.md,
    },
    innerContainer: {
      display: 'grid',
      alignItems: 'center',
      justifyItems: 'center',
    },
    rootMargin: {
      marginTop: responsiveVal(50, 250),
    },
    subject: {
      textAlign: 'center',
      marginTop: theme.spacings.sm,
    },
    button: {
      marginTop: theme.spacings.sm,
    },
    altButton: {
      marginTop: 6,
    },
  }),
  { name: 'FullPageMessage' },
)

export type FullPageMessageProps = {
  icon: React.ReactNode
  title: React.ReactNode
  children?: React.ReactNode
  button?: React.ReactNode
  altButton?: React.ReactNode
  disableMargin?: boolean
}

export default function FullPageMessage(props: FullPageMessageProps) {
  const { icon, title, children, button, altButton, disableMargin = false } = props
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, disableMargin || classes.rootMargin)}>
      <Container maxWidth='md' className={classes.innerContainer}>
        <div>{icon}</div>

        <div className={classes.subject}>
          <Typography variant='h3' gutterBottom>
            {title}
          </Typography>
          {children && (
            <Typography component='div' variant='body1'>
              {children}
            </Typography>
          )}
        </div>

        <div className={classes.button}>{button}</div>
        <div className={classes.altButton}>{altButton}</div>
      </Container>
    </div>
  )
}
