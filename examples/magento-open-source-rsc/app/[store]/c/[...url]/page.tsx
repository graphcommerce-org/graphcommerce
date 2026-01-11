import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LayoutNavigationWrapper } from '../../../../components/Layout'
import { CategoryPageDocument } from '../../../../graphql/CategoryPage.gql'
import { getClient } from '../../../../lib/apollo/client'
import { getStorefrontConfig } from '../../../../lib/storefront'

type CategoryPageProps = {
  params: Promise<{ store: string; url: string[] }>
}

/** Generate metadata for the category page */
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  const urlPath = url.join('/')
  const { data } = await client.query({
    query: CategoryPageDocument,
    variables: { url: urlPath },
  })

  const category = data?.categories?.items?.[0]

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: category.meta_title || category.name,
    description: category.meta_description || category.description || undefined,
    keywords: category.meta_keywords || undefined,
  }
}

/** Category page component (RSC) - Fetches category data server-side */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  const urlPath = url.join('/')
  const { data } = await client.query({
    query: CategoryPageDocument,
    variables: { url: urlPath },
  })

  const category = data?.categories?.items?.[0]

  if (!category) {
    notFound()
  }

  return (
    <LayoutNavigationWrapper>
      <Container maxWidth='lg' sx={{ py: 4 }}>
        {/* Category Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant='h1' component='h1' gutterBottom>
            {category.name}
          </Typography>
          {category.description && (
            <Typography
              variant='body1'
              color='text.secondary'
              dangerouslySetInnerHTML={{ __html: category.description }}
            />
          )}
        </Box>

        {/* Subcategories */}
        {category.children && category.children.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant='h2' component='h2' gutterBottom sx={{ fontSize: '1.5rem' }}>
              Subcategories
            </Typography>
            <Grid container spacing={2}>
              {category.children.map((child) =>
                child ? (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={child.uid}>
                    <Link
                      href={`/${store}/c/${child.url_path}`}
                      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                    >
                      <Card sx={{ height: '100%', '&:hover': { boxShadow: 4 } }}>
                        {child.image && (
                          <CardMedia
                            component='img'
                            height='140'
                            image={child.image}
                            alt={child.name || ''}
                          />
                        )}
                        <CardContent>
                          <Typography variant='subtitle1' component='div'>
                            {child.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ) : null,
              )}
            </Grid>
          </Box>
        )}

        {/* Breadcrumbs */}
        {category.breadcrumbs && category.breadcrumbs.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant='body2' color='text.secondary'>
              {category.breadcrumbs.map((crumb, index) =>
                crumb ? (
                  <span key={crumb.category_uid}>
                    {index > 0 && ' / '}
                    <Link
                      href={`/${store}/c/${crumb.category_url_path}`}
                      style={{ color: 'inherit' }}
                    >
                      {crumb.category_name}
                    </Link>
                  </span>
                ) : null,
              )}
              {' / '}
              {category.name}
            </Typography>
          </Box>
        )}

        {/* Placeholder for products */}
        <Box sx={{ py: 4, textAlign: 'center', bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant='body1' color='text.secondary'>
            Product list will be displayed here
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
            Category URL: {urlPath}
          </Typography>
        </Box>
      </Container>
    </LayoutNavigationWrapper>
  )
}
