import { ContainerProps } from '@mui/material'
import React from 'react'
import { UseStyles } from '../../Styles'
import { makeStyles, useMergedClasses } from '../../Styles/tssReact'
import { ColumnTwo } from '../ColumnTwo'

type StyleProps = { nodeLength: boolean }

const useStyles = makeStyles<StyleProps>({ name: 'ColumnTwoSpread' })((theme, { nodeLength }) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: `1fr 1fr 1fr`,
      gridTemplateAreas: nodeLength ? `"one one two"` : `"one two two"`,
      '& h2, & h3': {
        '&:empty': {
          display: 'block',
          minHeight: 30,
        },
      },
    },
    gridTemplateColumns: `1fr`,
    gridTemplateAreas: `"one" "two"`,
  },
}))

export type ColumnTwoSpreadProps = Omit<ContainerProps, 'children'> &
  UseStyles<typeof useStyles> &
  StyleProps & {
    colOneContent: React.ReactNode
    colTwoContent: React.ReactNode
  }

export function ColumnTwoSpread(props: ColumnTwoSpreadProps) {
  const { nodeLength, ...colProps } = props
  const classes = useMergedClasses(useStyles({ nodeLength }).classes, props.classes)
  return <ColumnTwo {...colProps} classes={classes} />
}
