import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { CategoryDescriptionFragment } from './CategoryDescription.gql'

export type CategoryDescriptionProps = {
  category: CategoryDescriptionFragment
  sx?: SxProps<Theme>
}

const cmpName = 'CategoryDescription' as const
const parts = ['root'] as const
const { classes } = extendableComponent(cmpName, parts)

export function CategoryDescription(props: CategoryDescriptionProps) {
  const { category, sx = [], ...divProps } = props
  const { description } = category

  return description ? (
    // eslint-disable-next-line react/no-danger
    <Box
      {...divProps}
      className={classes.root}
      dangerouslySetInnerHTML={{ __html: description }}
      sx={[
        (theme) => ({
          gridArea: 'description',
          margin: `0 auto ${theme.spacings.sm}`,
          padding: `0 ${theme.page.horizontal}`,
          textAlign: 'center',
          maxWidth: { md: '900px' },
          typography: 'subtitle1',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  ) : null
}
