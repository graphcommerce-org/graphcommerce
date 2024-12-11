import { styled } from '@mui/material'

export const BlogTags = styled('div')(({ theme }) => ({
  maxWidth: theme.breakpoints.values.md,
  margin: '0 auto',
  marginBottom: theme.spacings.sm,
}))

export * from './BlogTag'
