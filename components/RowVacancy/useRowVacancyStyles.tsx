import { Theme, makeStyles } from '@material-ui/core'
import { vpCalc } from 'components/Theme'

const useRowVacancyStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.tertiary.contrastText,
      textAlign: 'center',
      width: '100vw',
      position: 'relative',
      marginLeft: '-50vw',
      left: '50%',

      '& *::selection': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.main,
      },
    },
    status: {
      display: 'block',
      borderRadius: 4,
      border: '2px solid rgba(255,255,255,0.2)',
      color: theme.palette.tertiary.contrastText,
      paddingTop: vpCalc(10, 15),
      paddingRight: vpCalc(20, 30),
      paddingBottom: vpCalc(10, 15),
      paddingLeft: vpCalc(20, 30),
      marginBottom: 30,
      ...theme.typography.body1,
    },
    link: {
      marginLeft: 7,
    },
    button: {
      boxShadow: theme.shadows[20],
      ...theme.typography.body1,

      '&:hover, &:focus, &:active': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    ctaBlock: {
      display: 'flex',
      flexFlow: 'column wrap',
      alignItems: 'center',
      padding: vpCalc(15, 30),
      borderRadius: 3,
      border: '2px solid rgba(255,255,255,0.2)',
      maxWidth: 700,
      margin: '0 auto',
      justifyContent: 'space-between',
      color: theme.palette.tertiary.contrastText,
    },

    ctaText: {
      fontSize: vpCalc(14, 16),
      color: theme.palette.primary.contrastText,
      flex: '1 1 50%',
      marginBottom: 20,
    },

    [theme.breakpoints.up('md')]: {
      status: {
        display: 'inline-block',
      },
      ctaBlock: {
        flexFlow: 'row wrap',
      },
      ctaText: {
        marginRight: 60,
        marginBottom: 0,
      },
    },
  }),
  { name: 'RowVacancy' },
)

export default useRowVacancyStyles
