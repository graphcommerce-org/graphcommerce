import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { CategoryDescriptionFragment } from './CategoryDescription.gql'

export type CategoryDescriptionProps = Omit<CategoryDescriptionFragment, 'uid'> & {
  sx?: SxProps<Theme>
}

const cmpName = 'CategoryDescription' as const
const parts = ['root'] as const
const { classes } = extendableComponent(cmpName, parts)

export function CategoryDescription(props: CategoryDescriptionProps) {
  const { name, description, display_mode, sx = [], ...divProps } = props

  return description ? (
    // eslint-disable-next-line react/no-danger
    <Box
      {...divProps}
      className={classes.root}
      dangerouslySetInnerHTML={{ __html: description }}
      sx={[
        (theme) => ({
          gridArea: 'description',
          mx: 'auto',
          mt: 0,
          mb: theme.spacings.sm,
          py: 0,
          px: theme.page.horizontal,
          textAlign: 'center',
          [theme.breakpoints.up('md')]: {
            maxWidth: '50%',
          },
          [theme.breakpoints.up('xl')]: {
            maxWidth: '30%',
          },
          typography: 'subtitle1',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  ) : null
}
