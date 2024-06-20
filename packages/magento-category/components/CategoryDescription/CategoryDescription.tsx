import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { CategoryDescriptionFragment } from './CategoryDescription.gql'

type StateProps = {
  textAlignSm?: 'start' | 'center'
  textAlignMd?: 'start' | 'center'
}
const componentName = 'CategoryDescription' as const
const parts = ['root'] as const
const { withState } = extendableComponent<StateProps, typeof componentName, typeof parts>(
  componentName,
  parts,
)

export type CategoryDescriptionProps = Omit<CategoryDescriptionFragment, 'uid'> &
  StateProps & { sx?: SxProps<Theme> }

export function CategoryDescription(props: CategoryDescriptionProps) {
  const {
    name,
    description,
    display_mode,
    sx = [],
    textAlignSm = 'center',
    textAlignMd = 'center',
    ...divProps
  } = props

  const classes = withState({ textAlignSm, textAlignMd })

  return description ? (
    // eslint-disable-next-line react/no-danger
    <Box
      {...divProps}
      className={classes.root}
      dangerouslySetInnerHTML={{ __html: description }}
      sx={[
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
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  ) : null
}
