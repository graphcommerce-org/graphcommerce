import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { vpCalc } from 'components/Theme'

import Asset from 'components/Asset'
import RichText from 'components/RichText'
import AspectRatioContainer from 'components/AspectRatioContainer'
import { RowHeroProps } from '.'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      gridColumnGap: theme.gridSpacing.gutter,
      gridRowGap: theme.gridSpacing.row,
      display: 'grid',
      gridTemplateColumns: '1fr',
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(2,1fr)',
      },
      alignItems: 'center',
      paddingBottom: vpCalc(20, 160),
      paddingTop: vpCalc(20, 160),
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.divider,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
    },
  }),
  { name: 'RowHeroReversed' },
)

const RowHeroReversed: React.FC<RowHeroProps> = (props) => {
  const { text, asset } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <RichText {...text} />
      </div>
      <AspectRatioContainer width={650} height={776}>
        {asset && <Asset asset={asset} width={380} />}
      </AspectRatioContainer>
    </div>
  )
}

export default RowHeroReversed
