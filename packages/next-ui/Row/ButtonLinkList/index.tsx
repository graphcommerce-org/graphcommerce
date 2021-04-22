import { Container, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import SectionContainer from '../../SectionContainer'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      maxWidth: 820,
      marginBottom: theme.spacings.lg,
    },
    h1: {
      textAlign: 'center',
      ...theme.typography.h2,
    },
    caption: {
      display: 'block',
      padding: `${theme.spacings.xs} 0`,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
  }),
  { name: 'ButtonLinkList' },
)

export type ButtonLinkListProps = UseStyles<typeof useStyles> & {
  title: string
  children: React.ReactNode
}

export default function ButtonLinkList(props: ButtonLinkListProps) {
  const { title, children } = props
  const classes = useStyles(props)

  return (
    <Container maxWidth='md' className={classes.container}>
      <SectionContainer label={title}>{children}</SectionContainer>
    </Container>
  )
}
