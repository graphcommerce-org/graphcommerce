import React from 'react'
import { makeStyles, Theme, Container, ContainerProps } from '@material-ui/core'
import RichText from '../RichText'
import Asset from '../Asset'
import { UseStyles } from '../Theme'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      gridColumnGap: theme.gridSpacing.column,
      gridRowGap: theme.gridSpacing.row,
      marginBottom: theme.spacings.xl,
      display: `grid`,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `
        "one"
        "two"
      `,
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `
          "one two"
        `,
      },
    },
    colOne: { gridArea: 'one' },
    colTwo: { gridArea: 'two' },
  }),
  { name: 'RowColumnTwo' },
)

export type RowColumnTwoProps = GQLRowColumnTwoFragment &
  UseStyles<typeof useStyles> &
  ContainerProps

const RowColumnTwo: React.FC<RowColumnTwoProps> = (props) => {
  const { colOne, colOneIcon, colTwo, colTwoIcon, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Container className={classes.root} maxWidth='lg' {...containerProps}>
      <div className={classes.colOne}>
        {colOneIcon?.width ? <Asset asset={colOneIcon} width={colOneIcon.width / 2} /> : ''}
        <RichText {...colOne} />
      </div>
      <div className={classes.colTwo}>
        {colTwoIcon?.width ? <Asset asset={colTwoIcon} width={colTwoIcon.width / 2} /> : ''}
        <RichText {...colTwo} />
      </div>
    </Container>
  )
}

export default RowColumnTwo
