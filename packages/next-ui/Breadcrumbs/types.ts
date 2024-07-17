import { Theme } from '@emotion/react'
import { SxProps } from '@mui/material'

export type BreadcrumbItem = {
  name: string
  href: string
}

export type BreadcrumbsType = {
  breadcrumbs: ({ sx?: SxProps<Theme> } & BreadcrumbItem)[]
}
