import { Highlight, iconChevronRight, IconSvg, extendableComponent } from '@graphcommerce/next-ui'
import { Button, SxProps, Theme } from '@mui/material'
import React from 'react'
import { CategorySearchResultFragment } from './CategorySearchResult.gql'

export type CategorySearchResultProps = Omit<CategorySearchResultFragment, 'uid'> & {
  search?: string
  sx?: SxProps<Theme>
}

const name = 'CategorySearchResult' as const
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

export function CategorySearchResult(props: CategorySearchResultProps) {
  const { search = '', sx = [], ...catProps } = props

  return (
    <Button
      href={`/${catProps?.url_path ?? ''}`}
      fullWidth
      variant='pill'
      className={classes.root}
      endIcon={<IconSvg src={iconChevronRight} size='small' />}
      sx={[
        (theme) => ({
          background: theme.palette.background.default,
          padding: `${theme.spacings.xs} 18px ${theme.spacings.xs} 14px`,
          display: 'flex',
          justifyContent: 'space-between',
          minWidth: '100%',
          maxWidth: 'unset',
          borderRadius: '0',
          '&:not(&:last-of-type)': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '&:focus': {
            boxShadow: 'none',
          },
          '&:hover': {
            background: theme.palette.background.paper,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <div>
        {catProps?.breadcrumbs?.map((breadcrumb, key) => (
          <React.Fragment key={breadcrumb?.category_url_path}>
            <Highlight
              key={breadcrumb?.category_url_path}
              text={breadcrumb?.category_name ?? ''}
              highlight={search}
            />
            {(catProps.breadcrumbs?.length ?? 0) > key + 1 && ' / '}
          </React.Fragment>
        ))}
        <Highlight text={catProps?.name ?? ''} highlight={search} />
      </div>
    </Button>
  )
}
