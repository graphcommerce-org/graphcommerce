import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import PictureResponsiveNext from '../../PictureResponsiveNext'
import SingleItemSlider from '../SingleItemSlider'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      padding: `${theme.spacings.sm} 0 ${theme.spacings.lg}`,
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: '500px',
    },
    scroller: {},
    item: {
      width: '100%',
      height: '500px',
    },
    img: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      pointerEvents: 'none',
    },
    nav: {
      bottom: theme.spacings.sm,
    },
  }),
  { name: 'ImageGallery' },
)

export default function ImageGallery({ urls }: { urls: string[] }) {
  const { img, root, ...classes } = useStyles()
  return (
    <div className={root}>
      <SingleItemSlider classes={classes}>
        {urls.map((url) => (
          <PictureResponsiveNext
            className={img}
            key={url}
            src={url}
            type='image/jpeg'
            width={500}
            height={500}
            alt='img'
          />
        ))}
      </SingleItemSlider>
    </div>
  )
}
