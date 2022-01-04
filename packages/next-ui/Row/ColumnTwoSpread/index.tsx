import { ContainerProps, Theme } from '@mui/material'
import { makeStyles } from '../../Styles/tssReact'
import React from 'react'
import { UseStyles } from '../../Styles'
import ColumnTwo from '../ColumnTwo'

const useStyles = makeStyles()(
  ({ breakpoints }: Theme) => ({
    root: {
      [breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr 1fr`,
        gridTemplateAreas: ({ somethingWithNodeLength }: any) =>
          somethingWithNodeLength ? `"one one two"` : `"one two two"`,
        '& h2, & h3': {
          '&:empty': {
            display: 'block',
            minHeight: 30,
          },
        },
      },
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `
        "one"
        "two"
      `,
    },
  }),
  { name: 'ColumnTwoSpread' },
)

export type ColumnTwoSpreadProps = Omit<ContainerProps, 'children'> &
  UseStyles<typeof useStyles> & {
    nodeLength: boolean
    colOneContent: React.ReactNode
    colTwoContent: React.ReactNode
  }

export default function ColumnTwoSpread(props: ColumnTwoSpreadProps) {
  const { classes } = useStyles(props)

  return <ColumnTwo {...props} classes={classes} />
}
