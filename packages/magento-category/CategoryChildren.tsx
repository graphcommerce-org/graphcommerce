import { cloneDeep } from '@apollo/client/utilities'
import { Tabs, Tab, makeStyles, Link, Theme } from '@material-ui/core'
import { ProductListParams } from '@reachdigital/magento-product/ProductListItems/filterTypes'
import ScrollSnapSlider from '@reachdigital/next-ui/ScrollSnapSlider'
import React from 'react'
import { CategoryChildrenFragment } from './CategoryChildren.gql'
import CategoryLink from './CategoryLink'

type CategoryChildrenProps = CategoryChildrenFragment & {
  params: ProductListParams
}

const useSubcategoryMenuStyles = makeStyles(
  (theme: Theme) => ({
    slider: {},
    link: {
      whiteSpace: 'nowrap',
      display: 'block',
      marginRight: `${theme.spacings.xxs}`,
      marginLeft: `${theme.spacings.xxs}`,
      ...theme.typography.h6,
      position: 'relative',
      paddingBottom: 8,
      '&:before': {
        content: '""',
        width: 40,
        height: 2,
        background: theme.palette.primary.main,
        position: 'absolute',
        bottom: -8,
        left: 0,
        right: 0,
        margin: '0 auto',
        opacity: 0,
        transition: 'opacity .2s ease, bottom .2s ease',
      },
      '&:hover': {
        '&:before': {
          opacity: 1,
          bottom: 5,
        },
      },
    },
    fab: {
      boxShadow: 'none',
    },
  }),
  {
    name: 'CategoryChildren',
  },
)

export default function CategoryChildren(props: CategoryChildrenProps) {
  const { children, params } = props
  const classes = useSubcategoryMenuStyles(props)

  if (!children || children.length === 0) return null

  return (
    <>
      <ScrollSnapSlider
        classes={{
          container: classes.slider,
          prevFab: classes.fab,
          nextFab: classes.fab,
        }}
      >
        {children.map((cat) => {
          if (!cat?.url_path || !cat.id || !cat.name) return null

          const linkParams = cloneDeep(params)
          linkParams.url = cat.url_path
          delete linkParams.currentPage

          return (
            <CategoryLink
              key={cat.id}
              underline='none'
              color='inherit'
              {...linkParams}
              className={classes.link}
            >
              {cat.name}
            </CategoryLink>
          )
        })}
      </ScrollSnapSlider>
    </>
  )
}
