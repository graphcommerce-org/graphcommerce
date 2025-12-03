import type { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { extendableComponent, sxx } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { CategoryDescriptionFragment } from './CategoryDescription.gql'

type StateProps = {
  textAlignSm?: 'start' | 'center'
  textAlignMd?: 'start' | 'center'
}
const componentName = 'CategoryDescription'
const parts = ['root'] as const
const { withState } = extendableComponent<StateProps, typeof componentName, typeof parts>(
  componentName,
  parts,
)

export type CategoryDescriptionProps = StateProps & {
  sx?: SxProps<Theme>
  category: Omit<CategoryDescriptionFragment, 'uid'>
  productListRenderer: ProductListItemRenderer
}

export function CategoryDescription(props: CategoryDescriptionProps) {
  const {
    category,
    sx = [],
    textAlignSm = 'center',
    textAlignMd = 'center',
    productListRenderer,
    ...divProps
  } = props
  const { description } = category

  const classes = withState({ textAlignSm, textAlignMd })

  return description ? (
    // eslint-disable-next-line react/no-danger
    <Box
      {...divProps}
      className={classes.root}
      dangerouslySetInnerHTML={{ __html: description }}
      sx={sxx(
        (theme) => ({
          typography: 'subtitle1',
          [theme.breakpoints.down('sm')]: {
            textAlign: textAlignSm,
            '&.textAlignSmCenter': {
              mx: 'auto',
            },
          },
          [theme.breakpoints.up('md')]: {
            maxWidth: '900px',
            textAlign: textAlignMd,
            '&.textAlignMdCenter': {
              mx: 'auto',
            },
          },
        }),
        sx,
      )}
    />
  ) : null
}
