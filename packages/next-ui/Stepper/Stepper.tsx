import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import responsiveVal from '../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: responsiveVal(6, 10),
      paddingRight: responsiveVal(6, 10),
    },
    step: {
      height: 2,
      background: theme.palette.divider,
      flex: 1,
      marginRight: responsiveVal(6, 10),
      marginLeft: responsiveVal(6, 10),
    },
    current: {
      background: theme.palette.secondary.main,
    },
  }),
  { name: 'Stepper' },
)

export type StepperProps = {
  steps: number
  currentStep: number
} & UseStyles<typeof useStyles>

export default function Stepper(props: StepperProps) {
  const { steps, currentStep } = props
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      {[...Array(steps).keys()].map((step: number) => (
        <div
          className={clsx(classes.step, { [classes.current]: currentStep - 1 >= step })}
          key={step}
        />
      ))}
    </div>
  )
}
