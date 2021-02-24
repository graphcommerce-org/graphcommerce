import { makeStyles, Theme } from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles'
import clsx from 'clsx'
import React from 'react'
import PictureResponsiveNext from '../../PictureResponsiveNext'
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
    scrollerZoomed: {
      '& .image': {
        height: 'min(100vw, 100vh)',
        width: 'min(100vw, 100vh)',
      },
    },
    item: {
      background: '#f8f8f8',
      borderRadius: 2,
      position: 'relative',
    },
    imgContainer: {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    img: {
      display: 'block',
      pointerEvents: 'none',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
  { name: 'ImageGallery' },
)

export default function Images({ urls }: { urls: string[] }) {
  const { root, item, img, imgContainer, ...classes } = useStyles()

  return (
    <div className={root}>
      <ExpandableGallery classes={classes} size={size} zoomedSize={zoomedSize}>
        {urls.map((url) => (
          <div className={item} key={url}>
            <div className={imgContainer}>
              <PictureResponsiveNext
                src={url}
                className={clsx(img, 'image')}
                type='image/jpeg'
                width={1532}
                height={1678}
                alt='img'
              />
            </div>
          </div>
        ))}
      </ExpandableGallery>
    </div>
  )
}
