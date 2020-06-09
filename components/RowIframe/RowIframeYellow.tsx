import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { UseStyles, vpCalc } from 'components/Theme'
import AsyncIframe from 'components/AsyncIframe'

const useStyles = makeStyles(
  (theme: Theme) => ({
    aspectContainer: {
      position: 'relative',
      marginTop: vpCalc(20, 160),
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
      paddingBottom: vpCalc(20, 160),
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.divider,
    },
  }),
  { name: 'RowIframeYellow' },
)

export type RowIframeProps = GQLRowIframeFragment & UseStyles<typeof useStyles>

const RowIframeYellow: React.FC<RowIframeProps> = (props) => {
  const { title, iframeUrl } = props
  const { iframe, aspectContainer, row } = useStyles(props)

  return (
    <div className={row}>
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
    </div>
  )
}

export default RowIframeYellow
