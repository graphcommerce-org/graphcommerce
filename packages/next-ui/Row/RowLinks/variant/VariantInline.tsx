import { ContainerProps, SxProps, Theme } from '@mui/material'
import { RowLinks } from '../RowLinks'

type Props = {
  title: string
  children: React.ReactNode
  sx?: SxProps<Theme>
  showButtons?: boolean
} & Pick<ContainerProps, 'maxWidth'>

export function VariantInline(props: Props) {
  const { title, children, sx = [], maxWidth, showButtons } = props

  return (
    <RowLinks
      title={title}
      showButtons={showButtons}
      maxWidth={maxWidth}
      inlineTitle
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </RowLinks>
  )
}
