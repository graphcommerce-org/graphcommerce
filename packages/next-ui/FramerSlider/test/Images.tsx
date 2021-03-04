import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import PictureResponsiveNext from '../../PictureResponsiveNext'
import SliderImage from '../SliderImage'
import ExpandableGallery from '../variants/ExpandableGallery'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: `${theme.spacings.sm} 0 ${theme.spacings.lg}`,
      display: 'flex',
      justifyContent: 'center',

      // Set height on container
      height: '60vh',
    },
    container: {
      position: 'relative',
      zIndex: 10,
      background: '#f8f8f8',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      [theme.breakpoints.up('md')]: {
        width: theme.breakpoints.values.md,
      },
    },
    containerZoomed: {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  }),
  { name: 'ImageGallery' },
)

export default function Images({ urls }: { urls: string[] }) {
  const { root, ...classes } = useStyles()

  return (
    <div className={root}>
      <ExpandableGallery classes={classes}>
        {urls.map((url) => (
          <SliderImage key={url} width={1532} height={1678}>
            <PictureResponsiveNext
              src={url}
              type='image/jpeg'
              width={1532}
              height={1678}
              alt='img'
            />
          </SliderImage>
        ))}
      </ExpandableGallery>
    </div>
  )
}
