import type { SxProps, Theme } from '@mui/material'
import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'

export type FullPageMessageProps = {
  icon: React.ReactNode
  title: React.ReactNode
  children?: React.ReactNode
  button?: React.ReactNode
  altButton?: React.ReactNode
  disableMargin?: boolean
  sx?: SxProps<Theme>
}

const { classes, selectors } = extendableComponent('FullPageMessage', [
  'root',
  'innerContainer',
  'subject',
  'button',
  'altButton',
  'iconWrapper',
] as const)

export function FullPageMessage(props: FullPageMessageProps) {
  const { icon, title, children, button, altButton, disableMargin = false, sx = [] } = props

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          alignItems: 'center',
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.md,
        }),
        !disableMargin && {
          marginTop: responsiveVal(50, 250),
          marginBottom: responsiveVal(50, 250),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Container
        maxWidth='md'
        className={classes.innerContainer}
        sx={{
          display: 'grid',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        <Box className={classes.iconWrapper}>{icon}</Box>

        <Box
          className={classes.subject}
          sx={(theme) => ({ textAlign: 'center', marginTop: theme.spacings.sm })}
        >
          <Typography variant='h3' gutterBottom>
            {title}
          </Typography>
          {children && <Box typography='body1'>{children}</Box>}
        </Box>

        <Box className={classes.button} sx={(theme) => ({ marginTop: theme.spacings.sm })}>
          {button}
        </Box>
        <Box className={classes.altButton} sx={{ marginTop: '6px' }}>
          {altButton}
        </Box>
      </Container>
    </Box>
  )
}
FullPageMessage.selectors = selectors
