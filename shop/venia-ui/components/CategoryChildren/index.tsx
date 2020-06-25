import React from 'react'
import { Chip, Link } from '@material-ui/core'
import NextLink from 'next/link'

export default function CategoryChildren({ children }: GQLCategoryChildrenFragment) {
  return (
    <div>
      {children.map((category) => (
        <Chip
          key={category.id}
          clickable
          color='default'
          label={category.name}
          component={(chipProps) => (
            <NextLink href='/shop/browse/[...url]' as={category.url_path} passHref>
              <Link {...chipProps} color='inherit' underline='none' />
            </NextLink>
          )}
        />
      ))}
    </div>
  )
}
