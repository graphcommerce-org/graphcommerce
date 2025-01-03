import type { MediaQueryProps } from '../MediaQuery'
import { MediaQuery } from '../MediaQuery'
import { sxx } from '../utils/sxx'

export function MobileTopRight(props: Omit<MediaQueryProps, 'query'>) {
  const { sx, ...rest } = props
  return (
    <MediaQuery
      query={(theme) => theme.breakpoints.down('md')}
      display='flex'
      {...rest}
      sx={sxx(
        (theme) => ({
          position: 'absolute',
          right: theme.page.horizontal,
          top: 0,
          height: theme.appShell.headerHeightSm,
          alignItems: 'center',
        }),
        sx,
      )}
    />
  )
}
