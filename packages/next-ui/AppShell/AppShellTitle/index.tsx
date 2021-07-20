import { Container, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'
import Title, { TitleProps } from '../../Title'
import useAppShellHeaderContext from '../AppShellHeader/useAppShellHeaderContext'

type AppShellTitleProps = {
  children: React.ReactNode
} & Pick<TitleProps, 'icon'> &
  UseStyles<typeof useStyles>

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: theme.spacings.lg,
    },
  }),
  {
    name: 'AppShellTitle',
  },
)

export default function AppShellTitle(props: AppShellTitleProps) {
  const { children, icon } = props
  const { titleRef } = useAppShellHeaderContext()
  const classes = useStyles(props)

  return (
    <div ref={titleRef} className={classes.root}>
      <Container maxWidth='md'>
        <Title component='h2' size='medium' icon={icon ?? undefined}>
          {children}
        </Title>
      </Container>
    </div>
  )
}
