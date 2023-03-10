import { LayoutHeaderProps, LayoutHeader } from '../../Layout'

export function LayoutOverlayHeader(props: LayoutHeaderProps) {
  const { sx } = props
  return (
    <LayoutHeader
      {...props}
      noAlign
      sx={[
        (theme) => ({
          [theme.breakpoints.down('md')]: {
            '&.noAlign': {
              '.variantSmBottom.sizeSmFull &': {
                top: `calc(${theme.appShell.headerHeightSm} * 0.5 * -1)`,
              },
            },
          },
          [theme.breakpoints.up('md')]: {
            '&.noAlign': {
              '.variantMdBottom.sizeMdFull &': {
                top: `calc(${theme.appShell.headerHeightMd} * 0.5 * -1)`,
              },
            },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
