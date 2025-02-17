import {
  filterNonNullableKeys,
  RelativeToTimeFormat,
  SectionContainer,
} from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import type { SalesCommentItemFragment } from './SalesCommentItem.gql'

export type SalesCommentsProps = {
  comments: (SalesCommentItemFragment | null | undefined)[] | null | undefined
  sx?: SxProps<Theme>
}

export function SalesComments(props: SalesCommentsProps) {
  const { comments, sx } = props

  if (!comments?.length) return null

  return (
    <SectionContainer labelLeft='Comments' sx={sx}>
      {filterNonNullableKeys(comments).map((comment) => (
        <div key={comment.message}>
          {comment.message} <RelativeToTimeFormat date={comment.timestamp} />
        </div>
      ))}
    </SectionContainer>
  )
}
