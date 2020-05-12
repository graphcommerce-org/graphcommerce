import React from 'react'
import { makeStyles, Theme, Container, ThemeProvider } from '@material-ui/core'
import RichText from 'components/RichText'
import Asset from 'components/Asset'
import { vpCalc } from 'components/Theme'
import backgroundSvg from './logo-reach-bg-shadow-primary.svg'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      padding: `${theme.spacings.xl} 0`,
      background: theme.palette.primary.dark,
      position: `relative`,
      overflow: `hidden`,
    },
    container: {
      position: `relative`,
    },
    intro: {
      color: `#fff`,
      '& h2': {
        color: `#fff`,
        marginTop: 0,
        marginBottom: theme.spacings.md,
        paddingBottom: theme.spacings.md,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
      },
    },
    grid: {
      [theme.breakpoints.up('sm')]: {
        display: 'grid',
        gridTemplateColumns: `calc(${vpCalc(20, 40)} + 60px) 1fr 1fr`,
        gridTemplateAreas: `"icon text text"`,
      },
      marginBottom: theme.spacings.md,
      '&:last-child': {
        marginBottom: 0,
      },
    },
    gridIcon: {
      gridArea: `icon`,
    },
    gridText: {
      gridArea: `text`,
      color: `#fff`,
      [theme.breakpoints.up('sm')]: {
        columnCount: 2,
        columnGap: theme.gridSpacing.column,
      },
      '& h3': {
        color: theme.palette.tertiary.main,
        marginTop: 0,
        columnSpan: `all`,
      },
    },
    svgBackground: {
      position: 'absolute',
      bottom: '-7%',
      left: 0,
      zIndex: -0,
      width: '106%',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }),
  { name: 'RowIconWithTextList' },
)

const RowIconWithTextList: React.FC<GQLRowIconWithTextListFragment> = (props) => {
  const {
    text,
    rowOne,
    rowOneIcon,
    rowTwo,
    rowTwoIcon,
    rowThree,
    rowThreeIcon,
    rowFour,
    rowFourIcon,
    rowFive,
    rowFiveIcon,
    rowSix,
    rowSixIcon,
  } = props

  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <img className={classes.svgBackground} src={backgroundSvg} alt='Reach Logo' />
      <Container className={classes.container}>
        <div className={classes.intro}>
          <RichText {...text} />
        </div>

        <div className={classes.grid}>
          <div className={classes.gridIcon}>
            {rowOneIcon && <Asset asset={rowOneIcon} width='60' height='60' />}
          </div>
          <div className={classes.gridText}>
            <RichText {...rowOne} />
          </div>
        </div>
        <div className={classes.grid}>
          <div className={classes.gridIcon}>
            {rowTwoIcon && <Asset asset={rowTwoIcon} width='60' height='60' />}
          </div>
          <div className={classes.gridText}>
            <RichText {...rowTwo} />
          </div>
        </div>
        {rowThree ? (
          <div className={classes.grid}>
            <div className={classes.gridIcon}>
              <div className={classes.gridIcon}>
                {rowThreeIcon && <Asset asset={rowThreeIcon} width='60' height='60' />}
              </div>
            </div>
            <div className={classes.gridText}>
              <RichText {...rowThree} />
            </div>
          </div>
        ) : (
          ''
        )}
        {rowFour ? (
          <div className={classes.grid}>
            <div className={classes.gridIcon}>
              <div className={classes.gridIcon}>
                {rowFourIcon && <Asset asset={rowFourIcon} width='60' height='60' />}
              </div>
            </div>
            <div className={classes.gridText}>
              <RichText {...rowFour} />
            </div>
          </div>
        ) : (
          ''
        )}
        {rowFive ? (
          <div className={classes.grid}>
            <div className={classes.gridIcon}>
              <div className={classes.gridIcon}>
                {rowFiveIcon && <Asset asset={rowFiveIcon} width='60' height='60' />}
              </div>
            </div>
            <div className={classes.gridText}>
              <RichText {...rowFive} />
            </div>
          </div>
        ) : (
          ''
        )}
        {rowSix ? (
          <div className={classes.grid}>
            <div className={classes.gridIcon}>
              <div className={classes.gridIcon}>
                {rowSixIcon && <Asset asset={rowSixIcon} width='60' height='60' />}
              </div>
            </div>
            <div className={classes.gridText}>
              <RichText {...rowSix} />
            </div>
          </div>
        ) : (
          ''
        )}
      </Container>
    </div>
  )
}

export default RowIconWithTextList
