/* eslint-disable react/no-danger */
import React from 'react'
import Error from 'next/error'
import MagentoDynamic from 'shop/venia-ui/MagentoDynamic/MagentoDynamic'
import { GetCategoryPageProps } from './getCategoryPageProps'

const CategoryPage: React.FC<GetCategoryPageProps> = ({ category }) => {
  if (!category) return <Error statusCode={404}>404</Error>

  return (
    <>
      <MagentoDynamic
        loader={() => import('@magento/venia-ui/lib/RootComponents/Category')}
        skeleton={(ref) => <div ref={ref}>hoi</div>}
        id={category.id}
      />
    </>
  )
}

export default CategoryPage
