import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import SectionHeader, { SectionHeaderProps } from '../SectionHeader'
import { UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'SectionContainer' })((theme) => ({
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
}))

export type SectionContainerProps = PropsWithChildren<{ borderBottom?: boolean }> &
  UseStyles<typeof useStyles> &
  SectionHeaderProps

export default function SectionContainer(props: SectionContainerProps) {
  const { children, borderBottom } = props
  let { classes } = useStyles()
  classes = useMergedClasses(classes, props.classes)
  const { sectionContainer, borderBottom: borderBottomClass, ...passClasses } = classes

  return (
    <div className={clsx(sectionContainer, { [borderBottomClass]: borderBottom })}>
      <SectionHeader {...props} classes={passClasses} />
      {children}
    </div>
  )
}
