import React from 'react'
import { Chip, Link } from '@material-ui/core'
import NextLink from 'next/link'

type CategoryChildrenProps = GQLCategoryChildrenFragment & JSX.IntrinsicElements['div']

export default function CategoryChildren({ children, ...divProps }: CategoryChildrenProps) {
  return (
    <div {...divProps}>
      {children.map((category) => (
        <Chip
          key={category.id}
          clickable
          color='default'
          label={category.name}
          component={(chipProps) => (
            <NextLink href='/[...url]' as={category.url_path} passHref>
              <Link {...chipProps} color='inherit' underline='none' />
            </NextLink>
          )}
        />
      ))}
    </div>
  )
}
