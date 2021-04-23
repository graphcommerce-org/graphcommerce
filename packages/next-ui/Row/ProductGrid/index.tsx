import { Container, ContainerProps, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
    },
    grid: {
      '& > div': {
        display: 'grid',
        gridColumnGap: theme.spacings.md,
        gridRowGap: theme.spacings.lg,
        gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 260)}, 1fr))`,
      },
      '& > div > *': {
        minWidth: responsiveVal(150, 260),
      },
      '& > div > div > a > div > div': {
        // hide product options
        display: 'none',
      },
    },
    head: {
      display: 'grid',
      justifyContent: 'space-between',
      gridTemplateColumns: 'auto auto',
      alignItems: 'center',
      marginBottom: theme.spacings.md,
    },
    title: {
      textTransform: 'uppercase',
      ...theme.typography.h3,
    },
  }),
  { name: 'RowProductGrid' },
)

type ProductGridProps = UseStyles<typeof useStyles> & {
  title: string
  pageLinks: React.ReactNode
  productListItems: React.ReactNode
} & Omit<ContainerProps, 'children'>

export default function ProductGrid(props: ProductGridProps) {
  const { pageLinks, productListItems, title } = props
  const classes = useStyles(props)

  return (
    <Container className={classes.container}>
      <div className={classes.head}>
        <Typography variant='h2' className={classes.title}>
          {title}
        </Typography>
        <div>{pageLinks}</div>
      </div>
      <div className={classes.grid}>{productListItems}</div>
    </Container>
  )
}
