import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { CategoryHeroNavFragment } from './CategoryHeroNav.gql'
import CategoryLink from './CategoryLink'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateAreas: `"categories" "placeholder"`,
      gridTemplateRows: 'auto 60vw',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      marginBottom: theme.spacings.xl,
      [theme.breakpoints.up('sm')]: {
        rowGap: theme.spacings.sm,
        width: '100%',
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
      },
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
      minHeight: '20vh',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    [theme.breakpoints.up('md')]: {
      wrapper: {
        paddingTop: '0',
        gridColumnGap: '0',
        gridTemplateColumns: '1fr 3.6fr 0.4fr 8fr',
        gridTemplateAreas: `". categories . placeholder"`,
        gridTemplateRows: 'auto',
      },
      title: {
        textAlign: 'left',
      },
    },
  }),
  { name: 'CategoryHeroNav' },
)
type Props = {
  asset?: React.ReactNode
}
type CategoryHeroNavProps = Props & CategoryHeroNavFragment

export default function CategoryHeroNav({ children, name, asset }: CategoryHeroNavProps) {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <div className={classes.categories}>
        <Typography variant='h2' component='h1' className={classes.title}>
          {name}
        </Typography>

        {children?.map((category) => {
          if (!category?.url_path || !category.uid || !category.name) return null
          return (
            <CategoryLink
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
            </CategoryLink>
          )
        })}
      </div>
      <div className={classes.placeholder}>{asset}</div>
    </div>
  )
}
