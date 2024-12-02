import type { SxProps, Theme } from '@mui/material'

export type BreadcrumbItem = {
  name: string
  href: string
}

export type BreadcrumbsType = {
  breadcrumbs: ({ sx?: SxProps<Theme> } & BreadcrumbItem)[]
}
