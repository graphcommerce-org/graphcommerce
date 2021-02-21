import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import PictureResponsiveNext from '../../PictureResponsiveNext'
import ExpandableGallery from '../variants/ExpandableGallery'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: `${theme.spacings.sm} 0 ${theme.spacings.lg}`,
      width: '400px',
      height: '400px',
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
          <PictureResponsiveNext
            key={url}
            src={url}
            type='image/jpeg'
            width={500}
            height={500}
            alt='img'
          />
        ))}
      </ExpandableGallery>
    </div>
  )
}
