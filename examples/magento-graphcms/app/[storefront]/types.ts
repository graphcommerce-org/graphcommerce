export type PageProps = {
  params: {
    storefront: string
  }
}

export type LayoutProps = PageProps & {
  children?: React.ReactNode
}
