import { BreadcrumbsProps as BreadcrumbsPropsBase, LinkProps } from '@mui/material'

export type BreadcrumbsType = {
  breadcrumbs: Pick<LinkProps, 'underline' | 'key' | 'color' | 'href' | 'children'>[]
  name?: string | null
  breadcrumbsAmountDesktop?: number
  breadcrumbsAmountMobile?: number
  baseUrl?: string | null
} & Omit<BreadcrumbsPropsBase, 'children'>
