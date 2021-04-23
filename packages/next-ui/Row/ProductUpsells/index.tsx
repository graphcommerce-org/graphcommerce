import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import SidebarSlider from '../../FramerSlider/variants/SidebarSlider'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    h2: {
      fontSize: responsiveVal(16, 40),
    },
    item: {
      minWidth: responsiveVal(200, 400),
    },
  }),
  { name: 'ProductUpsells' },
)

type ProductUpsellsProps = UseStyles<typeof useStyles> & {
  title: string
  ProductUpsells: (props) => React.ReactElement
}

export default function RowProductUpsells(props: ProductUpsellsProps) {
  const { title, ProductUpsells } = props
  const classes = useStyles(props)

  return (
    <SidebarSlider
      sidebar={
        <Typography variant='h2' className={classes.h2}>
          {title}
        </Typography>
      }
    >
      <ProductUpsells classes={classes} />
    </SidebarSlider>
  )
}
