import { Theme, TypographyProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../../Styles'
import Title, { TitleProps } from '../../Title'
import useAppShellHeaderContext from '../AppShellHeader/useAppShellHeaderContext'

type AppShellTitleProps = {
  children: React.ReactNode
  bare?: boolean
  variant?: TypographyProps['variant']
} & Pick<TitleProps, 'icon'> &
  UseStyles<typeof useStyles>

const useStyles = makeStyles(
  (theme: Theme) => ({
    title: {},
    margin: {
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.lg,
    },
  }),
  {
    name: 'AppShellTitle',
  },
)

export default function AppShellTitle(props: AppShellTitleProps) {
  const { children, icon, bare, variant } = props
  const { titleRef } = useAppShellHeaderContext()
  const classes = useStyles(props)

  return (
    <Title
      ref={titleRef}
      component='h2'
      size='medium'
      variant={variant}
      icon={icon ?? undefined}
      classes={{ container: clsx(classes.title, !bare && classes.margin) }}
    >
      {children}
    </Title>
  )
}
