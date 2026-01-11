import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CategoryPageDocument } from '../../../graphql/CategoryPage.gql'
import { CmsPageDocument } from '../../../graphql/CmsPage.gql'
import { StoreConfigDocument } from '../../../graphql/StoreConfig.gql'
import { getClient } from '../../../lib/apollo/client'
import { redirectOrNotFound } from '../../../lib/redirectOrNotFound'
import { getStorefrontConfig } from '../../../lib/storefront'

type CatchAllPageProps = {
  params: Promise<{ store: string; url: string[] }>
}

/**
 * Generate metadata for the catch-all page. This handles both category pages and CMS pages that
 * don't have a prefix (like /women instead of /c/women).
 */
export async function generateMetadata({ params }: CatchAllPageProps): Promise<Metadata> {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  const urlPath = url.join('/')

  // Try to find a category first
  const { data: categoryData } = await client.query({
    query: CategoryPageDocument,
    variables: { url: urlPath },
  })
  const category = categoryData?.categories?.items?.[0]

  if (category) {
    return {
      title: category.meta_title || category.name,
      description: category.meta_description || category.description || undefined,
      keywords: category.meta_keywords || undefined,
    }
  }

  // Try to find a CMS page
  const { data: cmsData } = await client.query({
    query: CmsPageDocument,
    variables: { identifier: urlPath },
  })
  const cmsPage = cmsData?.cmsPage

  if (cmsPage) {
    return {
      title: cmsPage.meta_title || cmsPage.title,
      description: cmsPage.meta_description || undefined,
      keywords: cmsPage.meta_keywords || undefined,
    }
  }

  return { title: 'Page Not Found' }
}

/**
 * Catch-all page component (RSC). This handles:
 *
 * 1. Category pages at root level (e.g., /en/women)
 * 2. CMS pages (e.g., /en/about-us)
 * 3. 404 via redirectOrNotFound when neither matches
 *
 * Layout (header, footer, navigation) is handled by layout.tsx
 */
export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  const urlPath = url.join('/')

  // Try to find a category first
  const [{ data: categoryData }, { data: storeConfigData }] = await Promise.all([
    client.query({ query: CategoryPageDocument, variables: { url: urlPath } }),
    client.query({ query: StoreConfigDocument }),
  ])

  const category = categoryData?.categories?.items?.[0]

  // If we found a category, render the category page
  if (category) {
    return (
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
                      href={`/${store}/${child.url_path}`}
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
                      href={`/${store}/${crumb.category_url_path}`}
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
    )
  }

  // Try to find a CMS page
  const { data: cmsData } = await client.query({
    query: CmsPageDocument,
    variables: { identifier: urlPath },
  })
  const cmsPage = cmsData?.cmsPage

  // If we found a CMS page, render it
  if (cmsPage) {
    return (
      <Container maxWidth='md' sx={{ py: 4 }}>
        {cmsPage.content_heading && (
          <Typography variant='h1' component='h1' gutterBottom>
            {cmsPage.content_heading}
          </Typography>
        )}
        {cmsPage.content && (
          <Typography component='div' dangerouslySetInnerHTML={{ __html: cmsPage.content }} />
        )}
      </Container>
    )
  }

  // Neither category nor CMS page found - try redirect or 404
  return redirectOrNotFound(client, storeConfigData?.storeConfig, url, store)
}
