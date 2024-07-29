import { GcPageQuery } from '../../queries/GcPage.gql'

export type ContentAreaProps = GcPageQuery

export function ContentArea(props: ContentAreaProps) {
  const { gcPage } = props
  return <div />
}
