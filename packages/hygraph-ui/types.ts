import { HygraphPageFragment } from './graphql'

declare module '@graphcommerce/content-areas/components/ContentArea' {
  export interface ContentAreaProps {
    renderer: string
  }
}

declare module '@graphcommerce/content-areas/types' {
  export interface PageContent {
    hygraphPage?: HygraphPageFragment | null | undefined
  }
}
