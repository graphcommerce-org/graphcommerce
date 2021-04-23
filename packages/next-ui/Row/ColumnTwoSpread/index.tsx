import { ContainerProps, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'
import ColumnTwo from '../ColumnTwo'

const useStyles = makeStyles(
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

const useRichTextOne = makeStyles(({ spacings, breakpoints }: Theme) => ({
  paragraph: {
    [breakpoints.up('md')]: {
      columnCount: ({ columnCountTwo }: any) => columnCountTwo,
      columnGap: spacings.md,
    },
  },
}))

const useRichTextTwo = makeStyles(({ spacings, breakpoints }: Theme) => ({
  paragraph: {
    [breakpoints.up('md')]: {
      columnCount: ({ columnCountOne }: any) => columnCountOne,
      columnGap: spacings.md,
    },
  },
}))

type ColumnTwoSpreadProps = Omit<ContainerProps, 'children'> &
  UseStyles<typeof useStyles & typeof useRichTextOne & typeof useRichTextTwo> & {
    columnCountOne: number
    columnCountTwo: number
    somethingWithNodeLength: boolean
    ColContentOne: (props) => React.ReactElement
    ColContentTwo: (props) => React.ReactElement
  }

export default function ColumnTwoSpread(props: ColumnTwoSpreadProps) {
  const { ColContentOne, ColContentTwo } = props
  const classes = useStyles(props)
  const richTextTwoClasses = useRichTextTwo(props)
  const richTextOneClasses = useRichTextOne(props)

  return (
    <ColumnTwo
      {...props}
      classes={classes}
      colOneContent={<ColContentOne classes={richTextOneClasses} />}
      colTwoContent={<ColContentTwo classes={richTextTwoClasses} />}
    />
  )
}
