import Box from '@mui/material/Box'
import { SxProps, Theme } from '@mui/material/styles'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import { Row } from '../Row'

export type IconBlocksProps = {
  title: string
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const compName = 'IconBlocks' as const
const parts = ['container', 'title', 'optionsWrapper', 'block', 'wrapper'] as const
const { classes } = extendableComponent(compName, parts)

export function IconBlocks(props: IconBlocksProps) {
  const { title, children, sx = [] } = props

  return (
    <Row
      maxWidth='md'
      className={classes.container}
      sx={[{ maxWidth: 820 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box className={classes.wrapper} sx={(theme) => ({ paddingTop: `${theme.spacings.lg}` })}>
        <Box
          className={classes.title}
          sx={(theme) => ({ typography: 'h5', marginBottom: `${theme.spacings.md}` })}
        >
          {title}
        </Box>
        <Box
          className={classes.optionsWrapper}
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 280)}, 1fr))`,
            gap: `${theme.spacings.sm}`,
          })}
        >
          {children}
        </Box>
      </Box>
    </Row>
  )
}
