import { Links, LinksProps } from '../Links'

export function VariantImageLabelSwiper(props: LinksProps) {
  const { sx = [], ...rowLinksProps } = props

  return (
    <Links
      {...rowLinksProps}
      sx={[
        {
          '& .Scroller-root': {
            alignItems: 'start',
          },
          '& .RowLinks-title': {
            typography: 'h5',
            textTransform: 'uppercase',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
