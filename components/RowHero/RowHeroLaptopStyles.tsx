import { makeStyles, Theme } from '@material-ui/core'

const RowHeroLaptopStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      backgroundColor: '#fafafa',
      backgroundImage: 'none',
      paddingTop: theme.spacings.md,
      paddingBottom: theme.spacings.xl,
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
      alignItems: 'center',
    },
    colOne: { gridArea: 'one' },
    colTwo: { gridArea: 'two' },
    video: {
      width: '100%',
      height: 'auto',
    },
    h1: { fontWeight: 400 },
    headerWysiwyg: {
      '& a': {
        color: theme.palette.tertiary.contrastText,
        textDecoration: 'underline',
      },
    },
    video: {
      position: 'absolute',
      zIndex: -1,
      top: '0',
      width: '100%',
      height: 'auto',
      margin: '0 auto',
      left: '50%',
      objectFit: 'cover',
      transform: 'translateX(-50%)',
    },
    h1: { fontWeight: 400 },
    assetArea: {
      width: '100%',
      height: 'auto',
    },
    paragraph: {
      marginBottom: 0,
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
  }),
  { name: 'RowHeroLaptopStyles' },
)

export default RowHeroLaptopStyles
