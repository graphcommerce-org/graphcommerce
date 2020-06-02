import React from 'react'
import { Container, ContainerProps, makeStyles, Theme } from '@material-ui/core'
import { UseStyles, vpCalc } from 'components/Theme'
import AsyncIframe from 'components/AsyncIframe'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    aspectContainer: {
      position: 'relative',
      marginTop: theme.spacings.xl,
      backgroundColor: theme.palette.secondary.main,
      height: 0,
      paddingTop: 0,
      paddingBottom: vpCalc(160, 775),
    },
    iframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '80%',
      height: '80%',
      marginTop: vpCalc(17, 82),
      marginLeft: vpCalc(28, 138),
      border: 0,
    },
    row: {
      paddingBottom: vpCalc(70, 160),
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.divider,
    },
  }),
  { name: 'RowYoutubeVideoYellow' },
)

export type RowYoutubeVideoProps = GQLRowYoutubeVideoFragment &
  UseStyles<typeof useStyles> &
  ContainerProps

const RowYoutubeVideoYellow: React.FC<RowYoutubeVideoProps> = (props) => {
  const { videoId, title } = props
  const { iframe, aspectContainer, row } = useStyles(props)

  return (
    <div className={row}>
      <div className={aspectContainer}>
        <AsyncIframe
          className={iframe}
          title={title}
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          loading='lazy'
        />
      </div>
    </div>
  )
}

export default RowYoutubeVideoYellow
