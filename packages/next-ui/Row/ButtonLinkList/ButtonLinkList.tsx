import { Box, SxProps, Theme, Typography } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import { Row } from '../Row'

export type ButtonLinkListProps = {
  title: string
  children: React.ReactNode
  component?: React.ElementType
  sx?: SxProps<Theme>
} & OwnerState

type OwnerState = { containsBigLinks: boolean }

const compName = 'ButtonLinkList' as const
const parts = ['root', 'links'] as const
const { withState } = extendableComponent<OwnerState, typeof compName, typeof parts>(
  compName,
  parts,
)

export function ButtonLinkList(props: ButtonLinkListProps) {
  const { title, children, component = 'span', containsBigLinks, sx = [] } = props

  const classes = withState({ containsBigLinks })

  return (
    <Row
      maxWidth='md'
      className={classes.root}
      sx={[{ maxWidth: 820 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box
        sx={[
          (theme) => ({
            position: 'relative',
            '&:focus': {
              outline: 'none',
            },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: theme.spacings.sm,
            marginBottom: theme.spacings.xxs,
            paddingBottom: theme.spacings.xxs,
            borderBottom: `1px solid ${theme.vars.palette.divider}`,
          }),
        ]}
      >
        <Typography variant='overline' component={component} sx={{ color: 'textSecondary' }}>
          {title}
        </Typography>
      </Box>
      <Box
        className={classes.links}
        sx={(theme) => ({
          display: 'grid',
          columnGap: theme.spacings.sm,
          '&:not(.containsBigLinks)': {
            gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(210, 350)}, 1fr))`,
          },
        })}
      >
        {children}
      </Box>
    </Row>
  )
}
