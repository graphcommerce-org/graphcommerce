import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import SectionHeader from '../SectionHeader'
import { UseStyles } from '../Styles'

export type SectionContainerProps = PropsWithChildren<{
  label: React.ReactNode
  endLabel?: React.ReactNode
  className?: string
  borderBottom?: boolean
}> &
  UseStyles<typeof useStyles>

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    sectionHeader: {},
    borderBottom: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    labelContainer: {},
    labelContainerSidePadding: {},
    labelInnerContainer: {},
  }),
  { name: 'SectionContainer' },
)

export default function SectionContainer(props: SectionContainerProps) {
  const { children, label, endLabel, className, borderBottom } = props
  const classes = useStyles(props)

  return (
    <div className={clsx(className, { [classes.borderBottom]: borderBottom })}>
      <SectionHeader
        labelLeft={label}
        labelRight={endLabel}
        classes={{ labelContainer: classes.sectionHeader }}
      />
      {children}
    </div>
  )
}
