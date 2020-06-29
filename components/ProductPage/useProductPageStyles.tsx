import { Theme, makeStyles } from '@material-ui/core'

const useProductPageStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'grid',
    gridTemplate: `
      "breadcrumb breadcrumb"
      "description description"
      "children children"
      "filters filters"
      "sort sort"
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
  items: {
    gridArea: 'items',
  },
}))

export default useProductPageStyles
