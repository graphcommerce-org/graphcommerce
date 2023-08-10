import { LayoutHeaderProps, LayoutHeader } from '../../Layout'

export function LayoutOverlayHeader(props: LayoutHeaderProps) {
  const { sx, switchPoint } = props
  return (
    <LayoutHeader
      {...props}
      noAlign
      switchPoint={switchPoint !== 0 ? switchPoint : -1000}
      sx={[
        (theme) => ({
          [theme.breakpoints.down('md')]: {
            '&.noAlign': {
              '.variantSmBottom.sizeSmFull &, .variantSmBottom.sizeSmMinimal &': {
                top: `calc(${theme.appShell.headerHeightSm} * 0.5 * -1)`,
              },
            },
          },
          [theme.breakpoints.up('md')]: {
            '&.noAlign': {
              '.variantMdBottom.sizeMdFull &, .variantMdBottom.sizeMdMinimal &': {
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
