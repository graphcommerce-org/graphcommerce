import { sxx } from '@graphcommerce/next-ui'
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
      sx={sxx(
        (theme) => ({
          marginTop: '-2px',
          display: 'grid',
          gridAutoFlow: 'column',
          gap: theme.spacings.xxs,
        }),
        sx,
      )}
    >
      {[...Array(steps).keys()].map((step: number) => (
        <Box
          sx={sxx(
            {
              height: 2,
              bgcolor: 'divider',
            },
            currentStep - 1 >= step && {
              bgcolor: 'secondary.main',
            },
          )}
          className={`${classes.step} ${currentStep - 1 >= step ? classes.activeStep : ''}`}
          key={step}
        />
      ))}
    </Box>
  )
}
