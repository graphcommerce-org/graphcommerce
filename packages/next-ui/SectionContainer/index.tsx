import { Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import SectionHeader, { SectionHeaderProps } from '../SectionHeader'
import { UseStyles } from '../Styles'

const useStyles = makeStyles()(
  (theme: Theme) => ({
    sectionContainer: {},
    sectionHeaderSidePadding: {},
    sectionHeaderWrapper: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacings.xxs,
      marginBottom: theme.spacings.xxs,
    },
    labelLeft: {},
    labelRight: {},
    borderBottom: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }),
  { name: 'SectionContainer' },
)

export type SectionContainerProps = PropsWithChildren<{ borderBottom?: boolean }> &
  UseStyles<typeof useStyles> &
  SectionHeaderProps

export default function SectionContainer(props: SectionContainerProps) {
  const { children, borderBottom } = props
  const { sectionContainer, borderBottom: borderBottomClass, ...classes } = useStyles(props)

  return (
    <div className={clsx(sectionContainer, { [borderBottomClass]: borderBottom })}>
      <SectionHeader {...props} classes={classes} />
      {children}
    </div>
  )
}
