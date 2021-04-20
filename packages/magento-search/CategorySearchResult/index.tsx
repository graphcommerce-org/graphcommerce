import { makeStyles, Theme } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import Highlight from '@reachdigital/next-ui/Highlight'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import PageLink from 'next/link'
import React from 'react'
import { CategorySearchResultFragment } from './CategorySearchResult.gql'
import chevronRightIcon from './chevron_right.svg'

type CategorySearchResultProps = CategorySearchResultFragment & { search: string }

const useStyles = makeStyles(
  (theme: Theme) => ({
    categoryButton: {
      padding: `${theme.spacings.xs} 18px ${theme.spacings.xs} 14px`,
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.divider}`,
      minWidth: '100%',
      maxWidth: 'unset',
      borderRadius: '0',
      '&:focus': {
        boxShadow: 'none',
      },
      '&:hover': {
        background: '#f8f8f8', // TODO: use theme value
      },
    },
    totalProducts: {
      minWidth: 'max-content',
      ...theme.typography.caption,
      paddingRight: 7,
    },
  }),
  {
    name: 'CategorySearchResult',
  },
)

export default function CategorySearchResult(props: CategorySearchResultProps) {
  const { search, ...catProps } = props
  const classes = useStyles()

  return (
    <PageLink href={`/${catProps?.url_path ?? ''}`}>
      <Button
        fullWidth
        variant='contained'
        className={classes.categoryButton}
        disableElevation
        endIcon={
          <PictureResponsiveNext
            alt='chevron right'
            width={24}
            height={24}
            src={chevronRightIcon}
            type='image/svg+xml'
          />
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
