import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import SectionHeader from '../SectionHeader'

export type SectionContainerProps = PropsWithChildren<{
  label: React.ReactNode
  endLabel?: React.ReactNode
  className?: string
  borderBottom?: boolean
}>

const useStyles = makeStyles(
  (theme: Theme) => ({
    borderBottom: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }),
  { name: 'SectionContainer' },
)

export default function SectionContainer(props: SectionContainerProps) {
  const { children, label, endLabel, className, borderBottom } = props
  const classes = useStyles()

  return (
    <div className={clsx(className, { [classes.borderBottom]: borderBottom })}>
      <SectionHeader labelLeft={label} labelRight={endLabel} />
      {children}
    </div>
  )
}
