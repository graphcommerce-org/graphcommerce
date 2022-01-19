import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'Stepper' })((theme) => ({
  root: {
    marginTop: '-2px',
    display: 'grid',
    gridAutoFlow: 'column',
    gap: responsiveVal(8, 12),
    // padding: `0 ${theme.page.horizontal}`,
  },
  step: {
    height: responsiveVal(2, 3),
    background: theme.palette.divider,
  },
  current: {
    background: theme.palette.secondary.main,
  },
}))

export type StepperProps = {
  steps: number
  currentStep: number
} & UseStyles<typeof useStyles>

export function Stepper(props: StepperProps) {
  const { steps, currentStep } = props
  let { classes } = useStyles()
  classes = useMergedClasses(classes, props.classes)

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
