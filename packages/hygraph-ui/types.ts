import { ContentTypeRenderer } from './components'
import { HygraphPageFragment } from './graphql'

declare module '@graphcommerce/content-areas/components/ContentArea' {
  export interface ContentAreaProps {
    renderer: Partial<ContentTypeRenderer>
  }
}

declare module '@graphcommerce/content-areas/types' {
  export interface PageContent {
    hygraphPage?: HygraphPageFragment | null | undefined
  }
}
