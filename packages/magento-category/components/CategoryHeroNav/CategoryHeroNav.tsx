import { ProductListLink } from '@graphcommerce/magento-product'
import { responsiveVal, Row } from '@graphcommerce/next-ui'
import { Theme, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import { CategoryHeroNavFragment } from './CategoryHeroNav.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateAreas: `
        "title"
        "categories"
        "placeholder"
      `,
      gridTemplateRows: 'auto auto 1fr',
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacings.xxl,
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
      gridColumnGap: theme.spacings.xxl,
      gridRowGap: theme.spacings.lg,
      height: 'min-content',
      maxWidth: '80vw',
      justifySelf: 'center',
      alignSelf: 'start',
      gridTemplateColumns: '1fr 1fr',
      marginBottom: theme.spacings.lg,
      [theme.breakpoints.up('md')]: {
        margin: 0,
        gridColumnGap: theme.spacings.md,
        gridRowGap: theme.spacings.md,
        maxWidth: '100vw',
        width: '100%',
        justifySelf: 'start',
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
      display: 'flex',
      '& > div': {
        display: 'flex',
      },
      '& video': {
        objectFit: 'cover',
        width: '100%',
        borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
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
    <Row className={classes.wrapper} maxWidth={false}>
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
      <div className={classes.placeholder}>
        <div>{asset}</div>
      </div>
    </Row>
  )
}
