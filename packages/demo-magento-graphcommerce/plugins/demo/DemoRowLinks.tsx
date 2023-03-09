import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import type { RowLinksProps } from '@graphcommerce/next-ui'
import { responsiveVal } from '@graphcommerce/next-ui'

export const component = 'RowLinks'
export const exported = '@graphcommerce/next-ui/Row/RowLinks/RowLinks'
export const ifConfig: IfConfig = 'demoMode'

function DemoRowLinks(props: PluginProps<RowLinksProps>) {
  const { Prev, children, title, maxWidth, sx, ...rest } = props
  if (title !== 'Hot & New')
    return (
      <Prev {...rest} title={title} maxWidth={maxWidth} sx={sx}>
        {children}
      </Prev>
    )
  return (
    <Prev
      {...rest}
      maxWidth={false}
      title={title}
      sx={[
        (theme) => ({
          mt: `calc(${theme.spacings.xl} * -1)`,
          '& .RowLink-root': {
            display: 'grid',
            gridAutoFlow: 'column',
            textAlign: 'left',
            alignItems: 'start',
            justifyContent: 'start',
            rowGap: 3,
            '& > .MuiBox-root': {
              color: '#fff',
              width: responsiveVal(200, 400),
              maxWidth: responsiveVal(200, 400),
              px: theme.spacings.md,
              gridArea: '1 / 1',
              zIndex: 2,
              mixBlendMode: 'difference',
            },
            '& picture': {
              gridArea: '1 / 1',
            },
            '& h3': {
              mt: theme.spacings.md,
              typography: 'body2',
            },
            '& p': {
              typography: 'h4',
            },
            borderRadius: responsiveVal(theme.shape.borderRadius * 3, theme.shape.borderRadius * 4),
            overflow: 'hidden',
            '& img': {
              filter: 'none',
              width: responsiveVal(200, 400),
              maxWidth: responsiveVal(200, 400),
            },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Prev>
  )
}
export const Plugin = DemoRowLinks
