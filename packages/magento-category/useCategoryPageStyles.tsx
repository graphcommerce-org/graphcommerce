import { Theme, makeStyles } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'

const useCategoryPageStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      display: 'grid',
      gridTemplate: `
        "breadcrumb"
        "description"
        "children"
        "filters"
        "count"
        "items"
        "pagination"
      `,
      gridTemplateColumns: 'minmax(0, 1fr)',
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.sm,
    },
    breadcrumb: {
      gridArea: 'breadcrumb',
    },
    description: {
      gridArea: 'description',
      margin: '0 auto',
      textAlign: 'center',
      maxWidth: 732,
    },
    childCategories: {
      gridArea: 'children',
      margin: '0 auto',
      maxWidth: '100%',
    },
    pagination: {
      gridArea: 'pagination',
      margin: '32px auto 0 auto',
      marginBottom: responsiveVal(40, 80),
      display: 'flex',
      alignItems: 'left',
      fontSize: 18,
      '& span': {
        padding: '8px 8px 0 10px',
      },
      '& a': {
        transition: 'background .25s ease',
        borderRadius: '100%',
        height: 40,
        width: 40,
        '& svg': {
          color: '#000',
        },
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.04)',
        },
      },
      '& svg': {
        borderRadius: '100%',
        padding: 6,
        height: 40,
        width: 40,
        color: '#ddd',
      },
    },
    sort: {
      gridArea: 'sort',
    },
    filtersOuterContainer: {
      gridArea: 'filters',
      position: 'sticky',
      top: 10,
      zIndex: 9,
      margin: '0 auto',
      padding: '16px 16px',
      height: 90,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center',
        padding: 0,
      },
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    filterContainerComposite: {
      boxShadow: theme.shadows[2],
      background: theme.palette.background.default,
      padding: '16px 16px',
      borderRadius: 50,
      display: 'block',
      position: 'absolute',
      top: 0,
      width: '100%',
      height: 54,
      marginLeft: -16,
      [theme.breakpoints.down('sm')]: {
        opacity: 1,
        borderRadius: 0,
        width: '100%',
        position: 'fixed',
        left: '0',
        top: '0',
        margin: 0,
      },
    },
    filters: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        marginTop: -6,
      },
      [theme.breakpoints.down('sm')]: {
        overflowX: 'scroll',
        paddingBottom: 6,
      },
    },
    filtersSticky: {
      flexWrap: 'nowrap',
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'left',
        marginRight: `calc(${theme.page.horizontal} * -1)`,
      },
    },
    filterItem: {
      marginRight: responsiveVal(2, 4),
      marginLeft: responsiveVal(2, 4),
      marginBottom: responsiveVal(4, 8),
    },
    items: {
      gridArea: 'items',
    },
  }),
  { name: 'CategoryPageStyles' },
)

export default useCategoryPageStyles
