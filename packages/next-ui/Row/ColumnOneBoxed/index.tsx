import { Box, ContainerProps } from '@mui/material'
import { Row } from '..'
import { extendableComponent } from '../../Styles'

const compName = 'ColumnOneBoxed' as const
const slots = ['root', 'boxed'] as const
const { classes } = extendableComponent(compName, slots)

export function ColumnOneBoxed(props: ContainerProps) {
  const { children } = props

  return (
    <Row {...props} className={classes.root}>
      <Box
        className={classes.boxed}
        sx={(theme) => ({
          padding: theme.spacings.lg,
          boxShadow: theme.shadows[24],
          '& h1, & h2, & h3': { marginTop: 0 },
        })}
      >
        {children}
      </Box>
    </Row>
  )
}
