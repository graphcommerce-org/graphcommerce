import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { breakpointVal } from '../../Styles/breakpointVal'
import { Row } from '../Row'

export type ImageTextProps = {
  item?: React.ReactNode
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const name = 'ImageText'
const parts = ['root', 'wrapper', 'asset', 'copy'] as const
const { classes } = extendableComponent(name, parts)

export function ImageText(props: ImageTextProps) {
  const { item, children, sx } = props

  return (
    <Row maxWidth={false} className={classes.root} sx={sx}>
      <Box
        className={classes.wrapper}
        sx={(theme) => ({
          display: 'grid',
          background:
            theme.palette.mode === 'light'
              ? theme.palette.background.image
              : theme.palette.background.paper,
          justifyItems: 'center',
          columnGap: theme.spacings.lg,
          marginTop: theme.spacings.lg,
          paddingBottom: theme.spacings.lg,
          [theme.breakpoints.up('md')]: {
            paddingTop: 0,
            paddingBottom: 0,
            background: 'none',
            gridTemplateColumns: '1fr 1fr',
          },
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
        })}
      >
        <Box
          className={classes.asset}
          sx={(theme) => ({
            height: '100%',
            width: '100%',
            '& img': {
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              ...breakpointVal(
                'borderRadius',
                theme.shape.borderRadius * 2,
                theme.shape.borderRadius * 3,
                theme.breakpoints.values,
              ),
            },
          })}
        >
          {item}
        </Box>
        <Box
          className={classes.copy}
          sx={(theme) => ({
            marginTop: theme.spacings.lg,
            color: theme.palette.text.primary,
            maxWidth: '80%',
            display: 'grid',
            alignContent: 'center',
            [theme.breakpoints.up('md')]: {
              maxWidth: '70%',
              marginTop: 0,
            },
            '& > *': {
              maxWidth: 'max-content',
            },
          })}
        >
          {children}
        </Box>
      </Box>
    </Row>
  )
}
