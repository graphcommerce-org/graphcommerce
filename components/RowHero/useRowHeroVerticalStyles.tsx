import { makeStyles, Theme, TextareaAutosize } from '@material-ui/core'
import { vpCalc } from 'components/Theme'

const useRowHeroLaptopStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      backgroundColor: theme.palette.tertiary['600'],
      backgroundImage: 'none',
      paddingTop: theme.spacings.lg,
      paddingBottom: theme.spacings.xl,
      marginBottom: theme.spacings.xl,
    },
    grid: {
      display: `grid`,
      gridColumnGap: theme.gridSpacing.gutter,
      gridRowGap: theme.gridSpacing.row,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `"one" "two"`,

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `"one two"`,
      },
    },
    title: {
      marginTop: 0,
      marginBottom: 30,
      color: theme.palette.primary.main,
    },
    colOne: { gridArea: 'one' },
    colTwo: {
      gridArea: 'two',
      color: theme.palette.tertiary.contrastText,
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    headerWysiwyg: {
      '& a': {
        color: theme.palette.tertiary.contrastText,
        textDecoration: 'underline',
      },
    },
    video: {
      zIndex: -1,
      top: '0',
      width: '100%',
      height: 'auto',
      margin: '0 auto',
      left: '50%',
      objectFit: 'cover',
      borderRadius: 4,
    },
    assetArea: {
      width: '100%',
      height: 'auto',
    },
    paragraph: {
      marginBottom: 0,
      color: theme.palette.tertiary.contrastText,
    },
    ctaBlock: {
      padding: 30,
      marginTop: theme.spacings.sm,
      borderRadius: 3,
      border: '2px solid',
      borderColor: theme.palette.divider,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& p': {
        marginBottom: 0,
      },

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        '& p': {
          marginBottom: theme.spacings.md,
        },
      },
      [theme.breakpoints.up('xs')]: {
        '& p': {
          marginRight: theme.spacings.md,
        },
      },
      '& small .MuiTypography-body1': {
        ...theme.typography.body2,
      },
      '& > :first-child': {
        flexGrow: 0,
        flexShrink: 1,
      },
      '& > :last-child': {
        flexGrow: 1,
        flexShrink: 0,
      },
      paragraph: { marginBottom: 0 },
    },
    button: {
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.tertiary.contrastText,

      '&:hover, &:focus, &:active': {
        backgroundColor: theme.palette.primary.main,
      },

      '& svg': {
        color: '#fff !important',
      },
    },
    assetContainer: {
      perspectiveOrigin: 'left 35%',
      perspective: '100px',
      position: 'relative',
      flex: '0 0 40%',
    },
    vertical: {
      display: 'block',
      marginBottom: theme.spacings.lg,
      transform: 'rotateY(1.6deg)',
      transformOrigin: 'right',

      [theme.breakpoints.up('md')]: {
        marginBottom: 0,
      },
    },
  }),
  { name: 'RowHeroLaptopStyles' },
)

export default useRowHeroLaptopStyles
