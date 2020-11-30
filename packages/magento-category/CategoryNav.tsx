import { Theme, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import CategoryLink from './CategoryLink'
import { CategoryNavFragment } from './CategoryNav.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateAreas: `"categories" "placeholder"`,
      gridTemplateRows: 'auto 60vw',
      gap: `${theme.spacings.sm}`,
    },
    categories: {
      gridArea: 'categories',
      display: 'grid',
      gridRowGap: `${theme.spacings.lg}`,
      gridColumnGap: `${theme.spacings.md}`,
      gridTemplateColumns: '1fr 1fr',
      margin: `0`,
    },
    title: {
      gridColumn: '1/3',
      position: 'relative',
      textAlign: 'center',
    },
    placeholder: {
      gridArea: 'placeholder',
      background: '#efefef',
      margin: `${theme.spacings.sm} 0`,
    },
    [theme.breakpoints.up('md')]: {
      wrapper: {
        paddingTop: '0',
        gridTemplateColumns: '0.8fr 3fr 0.8fr 5fr',
        gridTemplateAreas: `". categories . placeholder"`,
        borderBottom: '1px solid rgba(0,0,0,0.15)',
      },
      categories: {
        margin: `${theme.spacings.xl} 0`,
      },
      title: {
        textAlign: 'left',
      },
    },
  }),
  { name: 'CategoryNav' },
)

type CategoryNavProps = CategoryNavFragment

export default function CategoryNav({ children, name }: CategoryNavProps) {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <div className={classes.categories}>
        <Typography variant='h2' component='h1' className={classes.title}>
          {name}
        </Typography>
        {children?.map((category) => {
          if (!category?.url_path || !category.id || !category.name) return null
          return (
            <CategoryLink
              underline='none'
              color='textPrimary'
              url={category.url_path}
              filters={{}}
              sort={{}}
              key={category.id}
            >
              <Typography variant='h4' component='span'>
                {category.name}
              </Typography>
            </CategoryLink>
          )
        })}
      </div>
      <div className={classes.placeholder} />
    </div>
  )
}
