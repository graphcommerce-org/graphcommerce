import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'
import { SectionHeader, SectionHeaderProps } from '../SectionHeader'
import { extendableComponent } from '../Styles'

export type SectionContainerProps = PropsWithChildren<OwnerState> & SectionHeaderProps

type OwnerState = { borderBottom?: boolean }
const name = 'SectionContainer' as const
const parts = ['root'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function SectionContainer(props: SectionContainerProps) {
  const { children, borderBottom, sx = [], ...sectionHeaderProps } = props
  const classes = withState({ borderBottom })

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          '&.borderBottom': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <SectionHeader
        {...sectionHeaderProps}
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.palette.divider}`,
          paddingBottom: theme.spacings.xxs,
          marginBottom: theme.spacings.xxs,
        })}
      />
      {children}
    </Box>
  )
}
