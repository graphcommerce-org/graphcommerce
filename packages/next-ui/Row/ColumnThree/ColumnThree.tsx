import type { ContainerProps } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { Row } from '../Row'

const compName = 'ColumnThree'
const parts = ['root', 'colOne', 'colTwo', 'colThree'] as const
const { classes } = extendableComponent(compName, parts)

export type ColumnThreeProps = Omit<ContainerProps, 'children'> & {
  colOneContent: React.ReactNode
  colTwoContent: React.ReactNode
  colThreeContent: React.ReactNode
}

export function ColumnThree(props: ColumnThreeProps) {
  const { colOneContent, colTwoContent, colThreeContent, sx = [], ...containerProps } = props

  return (
    <Row
      className={classes.root}
      {...containerProps}
      sx={[
        (theme) => ({
          display: 'grid',
          gridColumnGap: theme.spacings.md,
          gridRowGap: theme.spacings.lg,
          gridTemplateColumns: '1fr',
          gridTemplateAreas: `
          "one"
          "two"
          "three"
        `,
          '& h2, & h3': {
            typography: 'h4',
            [theme.breakpoints.up('md')]: {
              marginBottom: '-25px',
            },
          },
          '& p': {
            [theme.breakpoints.up('md')]: {
              marginTop: '65px',
            },
          },
          [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: '1fr 1fr',
            gridTemplateAreas: `
            "one two"
            "three three"
          `,
          },
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateAreas: '"one two three"',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box className={classes.colOne} sx={{ gridArea: 'one' }}>
        {colOneContent}
      </Box>
      <Box className={classes.colTwo} sx={{ gridArea: 'two' }}>
        {colTwoContent}
      </Box>
      <Box className={classes.colThree} sx={{ gridArea: 'three' }}>
        {colThreeContent}
      </Box>
    </Row>
  )
}
