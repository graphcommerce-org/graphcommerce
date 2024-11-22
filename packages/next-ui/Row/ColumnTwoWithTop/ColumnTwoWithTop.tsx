import type { ContainerProps } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { Row } from '../Row'

export type ColumnTwoWithTopProps = ContainerProps & {
  top: React.ReactNode
  left: React.ReactNode
  right: React.ReactNode
}

const compName = 'ColumnTwoWithTop'
const parts = ['root', 'colOne', 'colTwo'] as const
const { classes } = extendableComponent(compName, parts)

export function ColumnTwoWithTop(props: ColumnTwoWithTopProps) {
  const { left, right, top, sx = [], ...containerProps } = props

  return (
    <Row
      maxWidth='lg'
      className={classes.root}
      sx={[
        (theme) => ({
          display: 'grid',
          gap: `${theme.spacings.lg} 0`,
          gridTemplateAreas: '"top" "left" "right"',
          [theme.breakpoints.up('md')]: {
            gridTemplateAreas: '"top  ." "left right"',
            gridTemplateColumns: '1fr auto',
            gap: `${theme.spacings.sm} ${theme.spacings.xxl}`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...containerProps}
    >
      <Box className={classes.colOne} gridArea='top'>
        {top}
      </Box>
      <Box className={classes.colOne} gridArea='left'>
        {left}
      </Box>
      <Box className={classes.colTwo} gridArea='right'>
        {right}
      </Box>
    </Row>
  )
}
