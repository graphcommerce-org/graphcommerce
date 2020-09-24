import CategoryBreadcrumb from 'components/Category/CategoryBreadcrumb'
import React from 'react'

export default function ProductPageBreadcrumb(props: GQLProductPageBreadcrumbFragment) {
  const { categories } = props

  return (
    <>
      {categories?.map((category) => {
        if (!category || !category.id) return null
        return (
          <div key={category.id}>
            <CategoryBreadcrumb
              breadcrumbs={[
                ...(category.breadcrumbs ?? []),
                {
                  category_id: category.id,
                  category_url_path: category.url_path,
                  category_name: category.name,
                },
              ]}
            />
          </div>
        )
      })}
    </>
  )
}
