import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { extendableComponent } from '../Styles'

export type StepperProps = {
  steps: number
  currentStep: number
  sx?: SxProps<Theme>
}

const name = 'Stepper'
const parts = ['root', 'step', 'activeStep'] as const
const { classes } = extendableComponent(name, parts)

export function Stepper(props: StepperProps) {
  const { steps, currentStep, sx = [] } = props

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          marginTop: '-2px',
          display: 'grid',
          gridAutoFlow: 'column',
          gap: theme.spacings.xxs,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {[...Array(steps).keys()].map((step: number) => (
        <Box
          sx={[
            {
              height: 2,
              bgcolor: 'divider',
            },
            currentStep - 1 >= step && {
              bgcolor: 'secondary.main',
            },
          ]}
          className={`${classes.step} ${currentStep - 1 >= step ? classes.activeStep : ''}`}
          key={step}
        />
      ))}
    </Box>
  )
}
