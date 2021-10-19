import { ProductListLink } from '@graphcommerce/magento-product'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { CategoryHeroNavFragment } from './CategoryHeroNav.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateAreas: `"title" "categories" "placeholder"`,
      gridTemplateRows: 'auto 60vw',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      marginBottom: theme.spacings.xl,
      paddingRight: 0,
      paddingBottom: theme.page.vertical,
      [theme.breakpoints.up('md')]: {
        rowGap: theme.spacings.md,
        width: '100%',
        paddingRight: theme.page.horizontal,
      },
    },
    categories: {
      gridArea: 'categories',
      display: 'grid',
      gridColumnGap: theme.spacings.xl,
      gridTemplateColumns: 'repeat(2, min-content)',
      gridRowGap: theme.spacings.lg,
      height: 'min-content',
      alignSelf: 'center',
      maxWidth: '80vw',
      justifySelf: 'center',
      [theme.breakpoints.up('md')]: {
        gridColumnGap: theme.spacings.md,
        gridRowGap: theme.spacings.md,
        gridTemplateColumns: 'repeat(2, 1fr)',
        maxWidth: '100vw',
        width: '100%',
        alignSelf: 'start',
      },
    },
    title: {
      gridArea: 'title',
      alignSelf: 'center',
      [theme.breakpoints.up('md')]: {
        alignSelf: 'end',
      },
    },
    placeholder: {
      gridArea: 'placeholder',
      minHeight: '40vh',
      overflow: 'hidden',

      '& *': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    [theme.breakpoints.up('md')]: {
      placeholder: {
        minHeight: '80vh',
      },
      wrapper: {
        paddingTop: 0,
        gridColumnGap: 0,
        display: 'grid',
        gridTemplateAreas: `
         ". title . placeholder"
         ". categories . placeholder"
        `,
        gridTemplateColumns: '1fr 4.6fr 0.4fr 8fr',
        gridTemplateRows: '0.3fr 0.7fr',
      },
    },
  }),
  { name: 'CategoryHeroNav' },
)

type Props = {
  title: React.ReactNode
  asset?: React.ReactNode
}

type CategoryHeroNavProps = Props & CategoryHeroNavFragment

export default function CategoryHeroNav({ children, title, asset }: CategoryHeroNavProps) {
  const classes = useStyles()

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.title}>{title}</div>
        <div className={classes.categories}>
          {children?.map((category) => {
            if (!category?.url_path || !category.uid || !category.name) return null
            return (
              <ProductListLink
                underline='none'
                color='textPrimary'
                url={category.url_path}
                filters={{}}
                sort={{}}
                key={category.uid}
              >
                <Typography variant='h4' component='span'>
                  {category.name}
                </Typography>
              </ProductListLink>
            )
          })}
        </div>
        <div className={classes.placeholder}>{asset}</div>
      </div>
    </>
  )
}
