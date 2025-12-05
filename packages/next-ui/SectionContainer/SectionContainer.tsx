import { sxx } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import type { SectionHeaderProps } from '../SectionHeader/SectionHeader'
import { SectionHeader } from '../SectionHeader/SectionHeader'
import { extendableComponent } from '../Styles'

export type SectionContainerProps = SectionHeaderProps &
  OwnerState & { children?: React.ReactNode; className?: string }

type OwnerState = { borderBottom?: boolean }
const name = 'SectionContainer'
const parts = ['root'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function SectionContainer(props: SectionContainerProps) {
  const { children, className, borderBottom, sx = [], ...sectionHeaderProps } = props
  const classes = withState({ borderBottom })

  return (
    <Box
      className={`${classes.root} ${className ?? ''}`}
      sx={sxx(
        (theme) => ({
          '&.borderBottom': {
            borderBottom: `1px solid ${theme.vars.palette.divider}`,
          },
        }),
        sx,
      )}
    >
      <SectionHeader
        {...sectionHeaderProps}
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.vars.palette.divider}`,
          paddingBottom: theme.spacings.xxs,
          marginBottom: theme.spacings.xxs,
        })}
      />
      {children}
    </Box>
  )
}
