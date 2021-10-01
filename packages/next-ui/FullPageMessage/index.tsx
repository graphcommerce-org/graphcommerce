import { Container, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import PageMeta from '../PageMeta'
import responsiveVal from '../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginTop: responsiveVal(50, 250),
      alignItems: 'center',
    },
    subject: {
      textAlign: 'center',
      margin: `${theme.spacings.sm} 0`,
    },
    description: {
      marginTop: 8,
    },
    innerContainer: {
      display: 'grid',
      alignItems: 'center',
      justifyItems: 'center',
    },
    button: {
      marginTop: 6,
    },
  }),
  {
    name: 'FullPageMessage',
  },
)

export type FullPageMessageProps = {
  icon: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  button?: React.ReactNode
  altButton?: React.ReactNode
}

export default function FullPageMessage(props: FullPageMessageProps) {
  const { icon, title, description, button, altButton } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container maxWidth='md' className={classes.innerContainer}>
        <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots={['noindex']} />
        {icon}

        <div className={classes.subject}>
          <Typography component='h2' variant='h4'>
            {title}
          </Typography>
          {description && (
            <Typography component='p' variant='body1' className={classes.description}>
              {description}
            </Typography>
          )}
        </div>

        <div>{button}</div>
        <div className={classes.button}>{altButton}</div>
      </Container>
    </div>
  )
}
