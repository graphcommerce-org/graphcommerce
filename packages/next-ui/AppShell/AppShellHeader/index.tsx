import { Box, Divider, makeStyles, Theme } from '@material-ui/core'
import React, { useMemo } from 'react'
import Close from './Close'
import Back from './Back'
import Content, { ContentProps } from './Content'

type WrappedContent = Omit<ContentProps, 'leftAction' | 'rightAction'> & {
  primary?: React.ReactNode
  secondary?: React.ReactNode
}

type StyleProps = {
  floatingMd?: boolean
  floatingSm?: boolean
}

export type AppShellHeaderProps = StyleProps & WrappedContent

const useStyles = makeStyles(
  (theme: Theme) => ({
    sticky: ({ floatingMd, floatingSm }: StyleProps) => ({
      position: 'sticky',
      top: theme.page.vertical,
      zIndex: theme.zIndex.appBar,
      ...(floatingMd && {
        [theme.breakpoints.up('md')]: {
          top: theme.headerHeight.md,
        },
      }),
    }),
  }),
  { name: 'AppShellHeader' },
)

export default function AppShellHeader(props: AppShellHeaderProps) {
  const { children, divider, primary, secondary } = props

  const hasActions = !!primary || !!secondary
  let floatingMd = props.floatingMd ?? (!!divider || !children)
  let floatingSm = hasActions ? false : props.floatingSm ?? (!!divider || !children)

  const classes = useStyles({ floatingSm, floatingMd })

  const close = <Close />
  const back = <Back />
  let left: React.ReactNode = secondary ?? back
  const right: React.ReactNode = primary ?? close
  if (right !== close && !left) left = close

  if (!left && !right && !children) return null

  return (
    <div className={classes.sticky}>
      <Content
        left={left}
        right={right}
        divider={divider}
        floatingMd={floatingMd}
        floatingSm={floatingSm}
      >
        {children}
      </Content>
    </div>
  )
}
