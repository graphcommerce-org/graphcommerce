import { Theme, Typography, makeStyles } from '@material-ui/core'
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
      gap: `${theme.spacings.sm}`,
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      marginBottom: theme.spacings.xl,
    },
    categories: {
      gridArea: 'categories',
      display: 'grid',
      gridRowGap: `${theme.spacings.lg}`,
      gridColumnGap: `${theme.spacings.xs}`,
      height: 'min-content',
      alignSelf: 'center',
      width: '100%',
      maxWidth: '80vw',
      justifySelf: 'center',
      [theme.breakpoints.up('md')]: {
        gridRowGap: `${theme.spacings.md}`,
        maxWidth: '100vw',
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
      <div className={classes.placeholder}>{asset}</div>
    </div>
  )
}
