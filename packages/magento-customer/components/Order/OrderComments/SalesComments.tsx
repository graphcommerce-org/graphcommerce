import type { Maybe } from '@graphcommerce/graphql-mesh'
import type { SalesCommentItemFragment } from './SalesOrderComment.gql'

export type SalesCommentsProps = {
  comments: (SalesCommentItemFragment | null | undefined)[] | null | undefined
}

export function SalesComments(props: SalesCommentsProps) {
  const { comments } = props

  return <div>SalesComments</div>
}
