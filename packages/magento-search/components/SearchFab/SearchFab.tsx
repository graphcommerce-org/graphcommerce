import type { FabProps } from '@graphcommerce/next-ui'
import { Fab, iconSearch } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import type { SetOptional } from 'type-fest'

export type SearchFabProps = SetOptional<FabProps, 'icon'>

export function SearchFab(props: SearchFabProps) {
  const { sx, ...fabProps } = props
  const router = useRouter()
  return (
    <Fab
      color='inherit'
      size='medium'
      sx={sx}
      icon={iconSearch}
      onClick={async () => {
        await router.push('/search')
        globalThis.document.body.querySelector<HTMLInputElement>('[name="search"]')?.focus()
      }}
      {...fabProps}
    />
  )
}
