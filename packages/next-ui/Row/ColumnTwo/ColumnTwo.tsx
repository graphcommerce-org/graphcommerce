import Box from '@mui/material/Box'
import { ContainerProps } from '@mui/material/Container'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { Row } from '../Row'

export type ColumnTwoProps = Omit<ContainerProps, 'children'> & {
  colOneContent: React.ReactNode
  colTwoContent: React.ReactNode
}

const compName = 'ColumnTwo' as const
const parts = ['root', 'colOne', 'colTwo'] as const
const { classes } = extendableComponent(compName, parts)

export function ColumnTwo(props: ColumnTwoProps) {
  const { colOneContent, colTwoContent, sx = [], ...containerProps } = props

  return (
    <Row
      maxWidth='lg'
      {...containerProps}
      className={classes.root}
      sx={[
        (theme) => ({
          gridColumnGap: theme.spacings.md,
          gridRowGap: theme.spacings.lg,
          display: `grid`,
          gridTemplateColumns: `1fr`,
          gridTemplateAreas: `"one" "two"`,
          [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: `1fr 1fr`,
            gridTemplateAreas: `"one two"`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box className={classes.colOne} gridArea='one'>
        {colOneContent}
      </Box>
      <Box className={classes.colTwo} gridArea='two'>
        {colTwoContent}
      </Box>
    </Row>
  )
}
