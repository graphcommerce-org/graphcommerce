import React from 'react'
import { Theme, makeStyles, Container } from '@material-ui/core'
import RichText from 'components/RichText'
import { UseStyles, vpCalc } from 'components/Theme'
import clsx from 'clsx'
import { useHeaderSpacing } from 'components/Header'
import logoReachBgShadow from '../RowVacancy/logo-reach-bg-shadow-primary.svg'

const useRowIntroStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.tertiary.contrastText,
      textAlign: 'center',
      width: '100vw',
      position: 'relative',
      marginLeft: '-50vw',
      left: '50%',
      marginBottom: theme.spacings.xl,
      paddingTop: theme.spacings.xxl,

      '& *::selection': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    paragraph: {
      color: theme.palette.primary.contrastText,
    },
    h1: {
      '&:first-child': {
        marginTop: 0,
      },
    },
    [theme.breakpoints.up('md')]: {
      root: {
        backgroundImage: `url(${logoReachBgShadow})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 125%',
        backgroundSize: vpCalc(100, 1200),
      },
    },
  }),
  { name: 'RowIntro' },
)

export type RowIntroProps = GQLRowIntroFragment & UseStyles<typeof useRowIntroStyles>

const RowIntro: React.FC<RowIntroProps> = (props) => {
  const { content } = props
  const headerSpacing = useHeaderSpacing()
  const classes = useRowIntroStyles()

  return (
    <div className={clsx(headerSpacing.paddingTop, headerSpacing.paddingBottom, classes.root)}>
      <Container maxWidth='md'>
        {content && (
          <RichText {...content} classes={{ paragraph: classes.paragraph, h1: classes.h1 }} />
        )}
      </Container>
    </div>
  )
}

export default RowIntro
