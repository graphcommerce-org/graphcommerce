import { makeStyles, Theme } from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles'
import React from 'react'
import PictureResponsiveNext from '../../PictureResponsiveNext'
import SliderImage from '../SliderImage'
import ExpandableGallery from '../variants/ExpandableGallery'

const size: CSSProperties = { width: 400, height: 400 }
const zoomedSize: CSSProperties = { width: '100vw', height: '100vh' }

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: `${theme.spacings.sm} 0 ${theme.spacings.lg}`,
      display: 'flex',
      justifyContent: 'center',
      ...size,
    },
    container: {
      background: '#f8f8f8',
    },
    scrollerZoomed: {
      '& .image': {
        height: 'min(100vw, 100vh)',
        width: 'min(100vw, 100vh)',
      },
    },
  }),
  { name: 'ImageGallery' },
)

export default function Images({ urls }: { urls: string[] }) {
  const { root, ...classes } = useStyles()

  return (
    <div className={root}>
      <ExpandableGallery classes={classes} size={size} zoomedSize={zoomedSize}>
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
