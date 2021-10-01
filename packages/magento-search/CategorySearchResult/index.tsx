import { Button, Highlight, iconChevronRight, SvgImage, UseStyles } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PageLink from 'next/link'
import React from 'react'
import { CategorySearchResultFragment } from './CategorySearchResult.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    categoryButton: {
      padding: `${theme.spacings.xs} 18px ${theme.spacings.xs} 14px`,
      display: 'flex',
      justifyContent: 'space-between',
      minWidth: '100%',
      maxWidth: 'unset',
      borderRadius: '0',
      '&:not(&:last-child)': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      '&:focus': {
        boxShadow: 'none',
      },
      '&:hover': {
        background: theme.palette.background.highlight,
      },
    },
    totalProducts: {
      minWidth: 'max-content',
      paddingRight: 7,
    },
  }),
  {
    name: 'CategorySearchResult',
  },
)

export type CategorySearchResultProps = Omit<CategorySearchResultFragment, 'uid'> &
  UseStyles<typeof useStyles> & { search?: string }

export default function CategorySearchResult(props: CategorySearchResultProps) {
  const { search = '', ...catProps } = props
  const classes = useStyles(props)

  return (
    <PageLink href={`/${catProps?.url_path ?? ''}`}>
      <Button
        fullWidth
        variant='contained'
        className={classes.categoryButton}
        disableElevation
        endIcon={
          <SvgImage src={iconChevronRight} alt='chevron right' size='small' loading='eager' />
        }
      >
        <div>
          {catProps?.breadcrumbs?.map((breadcrumb) => (
            <React.Fragment key={breadcrumb?.category_url_path}>
              <Highlight
                key={breadcrumb?.category_url_path}
                text={breadcrumb?.category_name ?? ''}
                highlight={search}
              />
              {' / '}
            </React.Fragment>
          ))}
          <Highlight text={catProps?.name ?? ''} highlight={search} />
        </div>
      </Button>
    </PageLink>
  )
}
