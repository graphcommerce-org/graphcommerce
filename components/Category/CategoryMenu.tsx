import { Theme, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import cloneDeep from 'clone-deep'
import CategoryLink from 'components/Category/CategoryLink'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      borderBottom: '1px solid rgba(0,0,0,0.2)',
      padding: `${theme.page.vertical} 0`,
    },
    border: {
      border: '1px solid red;',
    },
    placeholder: {
      background: '#efefef',
      height: '25vw',
    },
    [theme.breakpoints.down('xs')]: {
      placeholder: {
        height: '23w',
      },
    },
  }),
  { name: 'CategoryMenu' },
)

export default function CategoryMenu({ children, params, name }) {
  const classes = useStyles()

  return (
    <Grid
      container
      direction='row'
      justify='space-between'
      alignItems='center'
      className={classes.wrapper}
    >
      <Grid container xs={12} sm={6}>
        <Grid item xs={12}>
          <Typography variant='h2' component='h1'>
            {name}
          </Typography>
        </Grid>
        {children?.map((category) => {
          if (!category?.url_path || !category.id || !category.name) return null
          const linkParams = cloneDeep(params)
          linkParams.url = category.url_path
          delete linkParams.currentPage

          return (
            <Grid key={category.id} {...linkParams} item xs={6}>
              <CategoryLink key={category.id} {...linkParams} underline='none' color='textPrimary'>
                <Typography variant='h3' component='span'>
                  {category.name}
                </Typography>
              </CategoryLink>
            </Grid>
          )
        })}
      </Grid>

      <Grid className={classes.placeholder} container xs={12} sm={6} />
    </Grid>
  )
}
