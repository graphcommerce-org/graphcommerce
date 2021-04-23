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
  { name: 'ProductRelated' },
)

type ProductRelatedProps = UseStyles<typeof useStyles> & {
  title: string
  RelatedProducts: (props) => React.ReactElement
}

export default function ProductRelated(props: ProductRelatedProps) {
  const { title, RelatedProducts } = props
  const classes = useStyles(props)

  return (
    <SidebarSlider
      sidebar={
        <Typography variant='h2' className={classes.h2}>
          {title}
        </Typography>
      }
    >
      <RelatedProducts classes={classes} />
    </SidebarSlider>
  )
}
