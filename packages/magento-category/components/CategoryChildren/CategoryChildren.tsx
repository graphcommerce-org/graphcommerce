import { cloneDeep } from '@apollo/client/utilities'
import { Scroller, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { ProductListLink, ProductListParams } from '@graphcommerce/magento-product'
import { UseStyles } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { CategoryChildrenFragment } from './CategoryChildren.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: theme.spacings.sm,
    },
    scroller: {
      display: 'grid',
      gridAutoFlow: 'column',
    },
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
        left: 0,
        right: 0,
        margin: '0 auto',
        opacity: 0,
        transition: 'opacity .2s ease, bottom .2s ease',
        bottom: 0,
      },
      '&:hover': {
        '&:before': {
          opacity: 1,
          bottom: 5,
        },
      },
    },
  }),
  {
    name: 'CategoryChildren',
  },
)

type CategoryChildrenProps = Omit<CategoryChildrenFragment, 'uid'> & {
  params: ProductListParams
} & UseStyles<typeof useStyles>

export default function CategoryChildren(props: CategoryChildrenProps) {
  const { children, params } = props
  const classes = useStyles(props)

  if (!children || children.length === 0) return null

  return (
    <ScrollerProvider scrollSnapAlign='none'>
      <div className={classes.container}>
        <Scroller className={classes.scroller}>
          {children.map((cat) => {
            if (!cat?.url_path || !cat.name) return null

            const linkParams = cloneDeep(params)
            linkParams.url = cat.url_path
            delete linkParams.currentPage

            return (
              <ProductListLink
                key={cat.url_path}
                underline='none'
                color='inherit'
                {...linkParams}
                className={classes.link}
              >
                {cat.name}
              </ProductListLink>
            )
          })}
        </Scroller>
      </div>
    </ScrollerProvider>
  )
}
