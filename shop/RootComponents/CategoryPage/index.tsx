/* eslint-disable react/no-danger */
import React from 'react'
import Head from 'next/head'
import Error from 'next/error'
import { Typography } from '@material-ui/core'
import { GetCategoryPageProps } from './getCategoryPageProps'

const CategoryPage: React.FC<GetCategoryPageProps> = ({ category, products }) => {
  if (!category) return <Error statusCode={404}>404</Error>

  return (
    <>
      <Head>
        <title>{category.meta_title ?? category.name}</title>
        {category.meta_description && (
          <meta name='description' content={category.meta_description} />
        )}
        <meta name='robots' content='INDEX, FOLLOW' />
      </Head>

      <Typography variant='h1'>{category.name}</Typography>

      {products.items.map((product) => (
        <div key={product.id}>
          {product.name} {product.sku} {product.small_image.url}
          {product.price.regularPrice.amount.value}
          {product.price.regularPrice.amount.currency}
        </div>
      ))}
    </>
  )
}

export default CategoryPage
