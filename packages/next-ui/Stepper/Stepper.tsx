import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import responsiveVal from '../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: responsiveVal(8, 12),
      // padding: `0 ${theme.page.horizontal}`,
    },
    step: {
      height: 2,
      background: theme.palette.divider,
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
