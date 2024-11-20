import type { Theme } from '@emotion/react'
import type { SxProps } from '@mui/material'

export type BreadcrumbItem = {
  name: string
  href: string
}

export type BreadcrumbsType = {
  breadcrumbs: ({ sx?: SxProps<Theme> } & BreadcrumbItem)[]
}
