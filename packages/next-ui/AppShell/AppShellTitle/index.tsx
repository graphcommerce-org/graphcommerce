import { Container, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'
import Title, { TitleProps } from '../../Title'
import useAppShellHeaderContext from '../AppShellHeader/useAppShellHeaderContext'

type AppShellTitleProps = {
  children: React.ReactNode
  bare?: boolean
} & Pick<TitleProps, 'icon'> &
  UseStyles<typeof useStyles>

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginTop: theme.spacings.lg,
      marginBottom: theme.spacings.lg,
    },
    title: {},
  }),
  {
    name: 'AppShellTitle',
  },
)

export default function AppShellTitle(props: AppShellTitleProps) {
  const { children, icon, bare } = props
  const { titleRef } = useAppShellHeaderContext()
  const classes = useStyles(props)

  const title = (
    <Title
      ref={titleRef}
      component='h2'
      size='medium'
      icon={icon ?? undefined}
      classes={{ container: classes.title }}
    >
      {children}
    </Title>
  )

  return bare ? (
    title
  ) : (
    <Container maxWidth='md' className={classes.container}>
      {title}
    </Container>
  )
}
