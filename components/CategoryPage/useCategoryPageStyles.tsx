import { Theme, makeStyles } from '@material-ui/core'

const useCategoryPageStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      display: 'grid',
      gridTemplate: `
      "breadcrumb breadcrumb"
      "description description"
      "filters filters"
      "items items"
      "pagination pagination"
    `,
      gridColumnGap: theme.gridSpacing.column,
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
