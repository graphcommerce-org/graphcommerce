import { Container, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import CategorySearchResult from '../CategorySearchResult'
import SearchForm from '../SearchForm'

const useStyles = makeStyles(
  (theme: Theme) => ({
    searchPageHeader: {
      boxShadow: '0 5px 4px 0 rgb(3 3 3 / 3%)',
    },
    categorySearchResults: {
      paddingBottom: theme.spacings.md,
    },
  }),
  { name: 'SearchIndexPage' },
)

type SearchPageHeaderProps = CategoryQueryFragment & { totalSearchResults: number; search?: string }

export default function SearchPageHeader(props: SearchPageHeaderProps) {
  const { categories, totalSearchResults, search } = props
  const classes = useStyles()

  return (
    <div className={classes.searchPageHeader}>
      <Container maxWidth='sm'>
        <SearchForm totalResults={totalSearchResults} search={search} />

        <div className={classes.categorySearchResults}>
          {categories?.items?.map((category) => (
            <CategorySearchResult key={category?.url_path} search={search} {...category} />
          ))}
        </div>
      </Container>
    </div>
  )
}
