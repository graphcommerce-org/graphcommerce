import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { breakpointVal } from '../../Styles/breakpointVal'
import { Row } from '../Row'

export type ImageTextBoxedProps = {
  children: React.ReactNode
  item?: React.ReactNode
  sx?: SxProps<Theme>
}

const name = 'ImageTextBoxed' as const
const parts = ['root', 'wrapper', 'asset', 'copy'] as const
const { classes } = extendableComponent(name, parts)

export function ImageTextBoxed(props: ImageTextBoxedProps) {
  const { children, item, sx = [] } = props

  return (
    <Row className={classes.root} sx={sx}>
      <Box
        className={classes.wrapper}
        sx={(theme) => ({
          display: 'grid',
          border: `1px solid ${theme.palette.divider}`,
          justifyItems: 'center',
          columnGap: theme.spacings.lg,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            background: 'none',
            gridTemplateColumns: '1fr auto',
            columnGap: theme.spacings.lg,
          },
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
          overflow: 'hidden',
        })}
      >
        <Box
          className={classes.copy}
          sx={(theme) => ({
            py: theme.spacings.lg,
            px: 0,
            color: theme.palette.text.primary,
            maxWidth: '80%',
            display: 'grid',
            alignContent: 'center',
            [theme.breakpoints.up('md')]: {
              maxWidth: '70%',
            },
            '& > *': {
              maxWidth: 'max-content',
            },
          })}
        >
          {children}
        </Box>
        <Box
          className={classes.asset}
          sx={(theme) => ({
            height: '100%',
            width: '100%',
            [theme.breakpoints.up('md')]: {
              height: '100%',
              width: theme.rv`${[100, 600]}px`,
            },
            '& img': {
              height: '100% !important',
              width: '100% !important',
              objectFit: `cover`,
            },
          })}
        >
          {item}
        </Box>
      </Box>
    </Row>
  )
}
