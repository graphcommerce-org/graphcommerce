import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { UseStyles, vpCalc } from 'components/Theme'
import AsyncIframe from 'components/AsyncIframe'

const useStyles = makeStyles(
  (theme: Theme) => ({
    aspectContainer: {
      position: 'relative',
      paddingTop: vpCalc(170, 620),
      marginBottom: theme.spacings.xl,
    },
    iframe: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  }),
  { name: 'RowIframe' },
)

export type RowIframeProps = GQLRowIframeFragment & UseStyles<typeof useStyles>

const RowIframe: React.FC<RowIframeProps> = (props) => {
  const { title, iframeUrl } = props
  const { iframe, aspectContainer } = useStyles(props)

  return (
    <div className={aspectContainer}>
      <AsyncIframe
        className={iframe}
        title={title}
        src={iframeUrl}
        frameBorder='0'
        allowFullScreen
        loading='lazy'
      />
    </div>
  )
}

export default RowIframe
