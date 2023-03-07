import { Box, Container, ContainerProps, SxProps, Theme } from '@mui/material'
import { RowLinks } from '../RowLinks'

type Props = {
  title: string
  children: React.ReactNode
  sx?: SxProps<Theme>
  showButtons?: boolean
} & Pick<ContainerProps, 'maxWidth'>

export function VariantLogoSwiper(props: Props) {
  const { title, children, sx = [], maxWidth, showButtons } = props

  return (
    <RowLinks
      showButtons={showButtons}
      maxWidth={maxWidth}
      title={title}
      sx={[
        (theme) => ({
          '& .RowLinks-title': {
            display: 'none',
          },
          '& .Scroller-root': {
            justifyContent: 'center',
            gap: theme.spacings.xxl,
            px: { xs: theme.spacings.xl },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </RowLinks>
  )
}
