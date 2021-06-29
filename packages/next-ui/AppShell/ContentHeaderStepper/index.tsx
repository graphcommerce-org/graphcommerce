import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import Stepper, { StepperProps } from '../../Stepper/Stepper'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: '0 auto',
      maxWidth: '100%',
      paddingLeft: 6,
      paddingRight: 6,
      [theme.breakpoints.up('md')]: {
        maxWidth: responsiveVal(250, 500),
      },
    },
  }),
  { name: 'ContentHeaderStepper' },
)

export default function ContentHeaderStepper(props: StepperProps) {
  const classes = useStyles(props)

  return <Stepper {...props} classes={{ root: classes.root }} />
}
