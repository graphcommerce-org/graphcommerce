import { ContainerProps, SxProps, Theme } from '@mui/material'
import { RowLinks } from '../RowLinks'

type Props = {
  title: string
  children: React.ReactNode
  sx?: SxProps<Theme>
  showButtons?: boolean
} & Pick<ContainerProps, 'maxWidth'>

export function VariantImageLabelSwiper(props: Props) {
  const { title, children, sx = [], maxWidth, showButtons } = props

  return (
    <RowLinks
      maxWidth={maxWidth}
      showButtons={showButtons}
      title={title}
      sx={[
        {
          '& .RowLinks-title': {
            typography: 'h5',
            textTransform: 'uppercase',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </RowLinks>
  )
}
