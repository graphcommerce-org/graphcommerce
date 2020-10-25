import { Theme, makeStyles } from '@material-ui/core'

const useCategoryPageStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      display: 'grid',
      gridTemplate: `
        "breadcrumb"
        "description"
        "filters"
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
    },
    childCategories: {
      gridArea: 'children',
    },
    pagination: {
      gridArea: 'pagination',
    },
    sort: {
      gridArea: 'sort',
    },
    filters: {
      gridArea: 'filters',
      marginLeft: -16,
      marginRight: -16,
      paddingLeft: 16,
      paddingRight: 16,
    },
    filterItem: {
      marginRight: 6,
    },
    items: {
      gridArea: 'items',
    },
  }),
  { name: 'ProductPageStyles' },
)

export default useCategoryPageStyles
