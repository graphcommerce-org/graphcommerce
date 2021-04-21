import { Theme, makeStyles } from '@material-ui/core'
import { isElementNode, isTextNode, Node } from '@reachdigital/graphcms-ui/RichText'
import React from 'react'
import RowColumnTwo, { RowColumnTwoProps } from '.'

function getNodeLength(node: Node): number {
  if (isElementNode(node))
    return node.children.map(getNodeLength).reduce<number>((prev, curr) => prev + curr, 0)

  if (isTextNode(node)) return node.text.length
  return 0
}

const getColumnCount = (props: RowColumnTwoProps, columnId: number) => {
  const colOneLength = getNodeLength(props.colOne.raw)
  const colTwoLength = getNodeLength(props.colTwo.raw)

  if (colOneLength >= colTwoLength && columnId === 1) return 2
  if (colOneLength >= colTwoLength && columnId === 2) return 1
  if (colOneLength < colTwoLength && columnId === 1) return 1
  if (colOneLength < colTwoLength && columnId === 2) return 2
}

const useStyles = makeStyles(
  ({ breakpoints }: Theme) => ({
    root: {
      [breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr 1fr`,
        gridTemplateAreas: (props: RowColumnTwoProps) =>
          getNodeLength(props.colOne.raw) >= getNodeLength(props.colTwo.raw)
            ? `"one one two"`
            : `"one two two"`,
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
  { name: 'RowColumnTwoSpread' },
)

const useRichTextOne = makeStyles(({ spacings, breakpoints }: Theme) => ({
  paragraph: {
    [breakpoints.up('md')]: {
      columnCount: (props: RowColumnTwoProps) => getColumnCount(props, 1),
      columnGap: spacings.md,
    },
  },
}))

const useRichTextTwo = makeStyles(({ spacings, breakpoints }: Theme) => ({
  paragraph: {
    [breakpoints.up('md')]: {
      columnCount: (props: RowColumnTwoProps) => getColumnCount(props, 2),
      columnGap: spacings.md,
    },
  },
}))

function RowColumnTwoSpread(props: RowColumnTwoProps) {
  const classes = useStyles(props)
  const richTextTwoClasses = useRichTextTwo(props)
  const richTextOneClasses = useRichTextOne(props)

  return (
    <RowColumnTwo
      {...props}
      classes={classes}
      richTextOneClasses={richTextOneClasses}
      richTextTwoClasses={richTextTwoClasses}
    />
  )
}

export default RowColumnTwoSpread
