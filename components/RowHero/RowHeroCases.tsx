import React from 'react'
import { makeStyles, Container, Theme } from '@material-ui/core'
import { vpCalc } from '../Theme'
import RowHero, { RowHeroProps } from '.'
import Asset from '../Asset'
import RichText from '../RichText'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      backgroundColor: '#fafafa',
      paddingTop: theme.spacings.xxl,
      paddingBottom: theme.spacings.xl,
    },
    grid: {
      display: `grid`,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `"one" "two"`,
      columnGap: theme.gridSpacing.column,
      rowGap: theme.gridSpacing.row,
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `"one two"`,
      },
      alignItems: 'center',
      justifyItems: 'center',
    },
    logo: {
      width: 360,
      height: 215,
      objectFit: 'contain',
      [theme.breakpoints.down('sm')]: {
        width: 280,
        height: 180,
      },
    },
    intro: {
      '& h1': {
        ...theme.typography.h1,
        marginTop: 0,
      },
    },
    asset: {},
  }),
  { name: 'RowHeroCases' },
)

const RowHeroCases: React.FC<RowHeroProps> = (props) => {
  const { text, asset } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.grid}>
          <div>{asset && <Asset asset={asset} width='360' className={classes.logo} />}</div>
          <div className={classes.intro}>
            <RichText {...text} />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default RowHeroCases
