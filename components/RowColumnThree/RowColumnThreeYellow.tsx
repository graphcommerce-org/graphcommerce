import React from 'react'
import { Container, makeStyles } from '@material-ui/core'
import RowColumnThree from '.'
import { theme, vpCalc } from '../Theme'

const useStyles = makeStyles({
  root: {
    position: `relative`,
    background: theme.palette.secondary.main,
    marginTop: `calc(${theme.spacings.xl} * -1)`,
    '& h2': {
      fontSize: vpCalc(18, 25),
    },
  },
})

const RowColumnThreeYellow: React.FC<GQLRowColumnThreeFragment> = (props) => {
  const classes = useStyles()

  console.log(props)

  return (
    <Container maxWidth='lg'>
      <div className={classes.root}>
        <RowColumnThree {...props} />
      </div>
    </Container>
  )
}

export default RowColumnThreeYellow
