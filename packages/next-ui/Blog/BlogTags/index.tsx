import { styled } from '@mui/material'

export const BlogTags = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: `0 auto`,
  marginBottom: theme.spacings.sm,
}))

export * from './BlogTag'
