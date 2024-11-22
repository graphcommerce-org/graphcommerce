import type { ContainerProps } from '@mui/material'
import { Box } from '@mui/material'
import { extendableComponent } from '../../Styles'
import { Row } from '../Row'

const compName = 'ColumnOneBoxed'
const parts = ['root', 'boxed'] as const
const { classes } = extendableComponent(compName, parts)

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
