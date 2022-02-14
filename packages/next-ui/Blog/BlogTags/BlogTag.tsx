import { Chip, SxProps } from '@mui/material'
import PageLink from 'next/link'

type BlogTagsProps = {
  url: string
  title: string
  sx?: SxProps
}

export function BlogTag(props: BlogTagsProps) {
  const { url, title, sx = [] } = props
  return (
    <PageLink href={`/${url}`} passHref>
      <Chip
        label={title}
        sx={[
          {
            marginRight: '8px',
            borderRadius: '4px',
            fontSize: '14px',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    </PageLink>
  )
}
