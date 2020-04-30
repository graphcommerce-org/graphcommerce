import React from 'react'
import { Container, makeStyles, Theme } from '@material-ui/core'
import RowColumnThree from '.'
import { vpCalc } from '../Theme'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: `relative`,
      background: theme.palette.secondary.main,
      marginTop: `calc(${theme.spacings.xl} * -1)`,
      marginBottom: theme.spacings.xl,
      '& h2': {
        fontSize: vpCalc(18, 25),
      },
    },
  }),
  { name: 'RowColumnThreeYellow' },
)

const RowColumnThreeYellow: React.FC<GQLRowColumnThreeFragment> = (props) => {
  const classes = useStyles()

  // console.log(props)

  return (
    <Container maxWidth='lg'>
      <div className={classes.root}>
        <RowColumnThree {...props} />
      </div>
    </Container>
  )
}

export default RowColumnThreeYellow
