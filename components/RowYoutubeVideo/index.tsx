import React from 'react'
import { Container, ContainerProps, makeStyles } from '@material-ui/core'
import { UseStyles } from '../Theme'

const useStyles = makeStyles(
  {
    root: {},
    aspectContainer: {
      position: 'relative',
      paddingTop: 'calc(100% / 16 * 9)',
    },
    iframe: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  },
  { name: 'RowYoutubeVideo' },
)

export type RowYoutubeVideoProps = GQLRowYoutubeVideoFragment &
  UseStyles<typeof useStyles> &
  ContainerProps

const RowYoutubeVideo: React.FC<RowYoutubeVideoProps> = (props) => {
  const { videoId, title, ...containerProps } = props
  const { iframe, aspectContainer, ...classes } = useStyles(props)

  return (
    <Container {...containerProps} classes={classes}>
      <div className={aspectContainer}>
        <iframe
          className={iframe}
          title={title}
          width='1920'
          height='1080'
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
    </Container>
  )
}

export default RowYoutubeVideo
