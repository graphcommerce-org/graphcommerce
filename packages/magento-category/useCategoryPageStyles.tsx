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
    filters: {
      gridArea: 'filters',
      margin: `0 auto`,
      paddingLeft: 16,
      paddingRight: 16,
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    filterItem: {
      marginRight: responsiveVal(2, 4),
      marginBottom: responsiveVal(6, 12),
      marginLeft: responsiveVal(2, 4),
    },
    items: {
      gridArea: 'items',
    },
  }),
  { name: 'ProductPageStyles' },
)

export default useCategoryPageStyles
