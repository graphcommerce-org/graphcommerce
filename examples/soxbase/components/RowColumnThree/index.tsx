import { makeStyles, Theme, Container, ContainerProps } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import { UseRichTextStyles } from '@reachdigital/graphcms-ui/RichText/useRichTextStyles'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'
import { RowColumnThreeFragment } from './RowColumnThree.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      marginBottom: theme.spacings.lg,
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `
        "one"
        "two"
        "three"
      `,

      '& h2, & h3': {
        ...theme.typography.h4,
        [theme.breakpoints.up('md')]: {
          marginBottom: '-25px',
        },
      },
      '& p': {
        [theme.breakpoints.up('md')]: {
          marginTop: '65px',
        },
      },
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `
        "one two"
        "three three"
      `,
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr 1fr`,
        gridTemplateAreas: '"one two three"',
      },
    },
    colOne: { gridArea: 'one', zIndex: 2 },
    colTwo: { gridArea: 'two', zIndex: 2 },
    colThree: { gridArea: 'three', zIndex: 2 },
  }),
  { name: 'RowColumnThree' },
)

export type RowColumnThreeProps = RowColumnThreeFragment &
  UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    richTextOneClasses?: UseRichTextStyles['classes']
    richTextTwoClasses?: UseRichTextStyles['classes']
    richTextTheeClasses?: UseRichTextStyles['classes']
  }

const RowColumnThree: React.FC<RowColumnThreeProps> = (props) => {
  const {
    colOne,
    colTwo,
    colThree,
    richTextOneClasses,
    richTextTwoClasses,
    richTextTheeClasses,
    ...containerProps
  } = props
  const classes = useStyles(props)

  return (
    <Container className={classes.root} {...containerProps}>
      <div className={classes.colOne}>
        <RichText {...colOne} classes={richTextOneClasses} />
      </div>
      <div className={classes.colTwo}>
        <RichText {...colTwo} classes={richTextTwoClasses} />
      </div>
      <div className={classes.colThree}>
        <RichText {...colThree} classes={richTextTheeClasses} />
      </div>
    </Container>
  )
}

export default RowColumnThree
