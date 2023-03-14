import Box from '@mui/material/Box'
import { ContainerProps } from '@mui/material/Container'
import { extendableComponent } from '../../Styles'
import { Row } from '../Row'

const compName = 'ColumnOneBoxed' as const
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
