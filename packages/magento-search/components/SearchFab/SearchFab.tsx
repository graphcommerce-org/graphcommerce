import type { FabProps, MediaQueryProps } from '@graphcommerce/next-ui'
import { Fab, iconSearch, MediaQuery, sxx } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import type { SetOptional } from 'type-fest'

type SearchFabProps = SetOptional<FabProps, 'icon'> & {
  query?: MediaQueryProps['query']
}

export function SearchFabBase(props: SearchFabProps) {
  const { query, sx, ...fabProps } = props
  const router = useRouter()
  return (
    <Fab
      color='inherit'
      size='medium'
      sx={sxx({ position: 'absolute', right: 0, top: 0 }, sx)}
      icon={iconSearch}
      onClick={async () => {
        await router.push('/search')
        globalThis.document.body.querySelector<HTMLInputElement>('[name="search"]')?.focus()
      }}
      {...fabProps}
    />
  )
}

export function SearchFab(props: SearchFabProps) {
  const { query, sx, ...fabProps } = props
  return (
    <MediaQuery query={query ?? ((theme) => theme.breakpoints.down('md'))}>
      <SearchFabBase {...fabProps} />
    </MediaQuery>
  )
}
