import { Container, Typography } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'FullPageMessage' })((theme) => ({
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
}))

export type FullPageMessageProps = {
  icon: React.ReactNode
  title: React.ReactNode
  children?: React.ReactNode
  button?: React.ReactNode
  altButton?: React.ReactNode
  disableMargin?: boolean
} & UseStyles<typeof useStyles>

export function FullPageMessage(props: FullPageMessageProps) {
  const { icon, title, children, button, altButton, disableMargin = false } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

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
