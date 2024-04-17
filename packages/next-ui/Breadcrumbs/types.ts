import { BreadcrumbsProps as BreadcrumbsPropsBase, LinkProps } from '@mui/material'

export type BreadcrumbsType = {
  breadcrumbs: Pick<LinkProps, 'underline' | 'key' | 'color' | 'href' | 'children'>[]
  name?: string | null
  breadcrumbsAmount?: number
  baseUrl?: string | null
} & Omit<BreadcrumbsPropsBase, 'children'>
