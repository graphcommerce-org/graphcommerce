import type { ContainerSizingProps } from '@graphcommerce/next-ui'
import { Container, sxx } from '@graphcommerce/next-ui'

export type HeaderContainerProps = ContainerSizingProps

export function HeaderContainer(props: HeaderContainerProps) {
  const { children, sx, ...containerProps } = props
  
  return (
    <Container
      sizing='shell'
      maxWidth={false}
      component='header'
      {...containerProps}
      sx={sxx(
        (theme) => ({
          zIndex: theme.zIndex.appBar - 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: theme.appShell.headerHeightSm,
          pointerEvents: 'none',
          '& > *': {
            pointerEvents: 'all',
          },
          [theme.breakpoints.up('md')]: {
            height: theme.appShell.headerHeightMd,
            top: 0,
            display: 'flex',
            justifyContent: 'left',
            width: '100%',
          },
        }),
        sx,
      )}
    >
      {children}
    </Container>
  )
}
