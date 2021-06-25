import { makeStyles, Theme } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconCheckmarkGreen } from '@reachdigital/next-ui/icons'
import React, { PropsWithChildren } from 'react'
import responsiveVal from '../../next-ui/Styles/responsiveVal'
import { ProductPageGalleryFragment } from '../ProductPageGallery/ProductPageGallery.gql'
import { ProductSidebarUspsFragment } from './ProductSidebarUsps.gql'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexFlow: 'wrap',
  },
  icon: {
    height: '20px',
  },
  text: {
    marginLeft: 5,
    fontSize: responsiveVal(12, 14),
  },
}))

export type ProductSidebarUspsProps = ProductSidebarUspsFragment &
  PropsWithChildren<ProductPageGalleryFragment>

export default function ProductSidebarUsps(props: ProductSidebarUspsProps) {
  const { sidebarUsps } = props
  const classes = useStyles()

  if (!sidebarUsps) return <></>

  return (
    <div className={classes.root}>
      {sidebarUsps?.uspsMultiple?.map((usps) => (
        <div key={usps.id} className={classes.root}>
          <SvgImage
            classes={{ root: classes.icon }}
            size='small'
            src={iconCheckmarkGreen}
            alt='checkmark'
          />
          <RichText classes={{ root: classes.text }} raw={usps?.description?.raw} />
        </div>
      ))}
    </div>
  )
}
