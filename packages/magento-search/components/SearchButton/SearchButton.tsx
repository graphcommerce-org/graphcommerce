import { IconSvg, extendableComponent, iconSearch, responsiveVal } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import type { TextFieldProps } from '@mui/material'
import { TextField } from '@mui/material'

export type SearchButtonProps = TextFieldProps

type OwnerState = { fullWidth?: boolean }
const name = 'SearchButton'
const parts = ['root', 'inputRoot'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

/**
 * @deprecated The use of `SearchButton` is not advised. It will import lots of things from
 *   `@mui/material`. Use the <SearchLink /> component instead.
 */
export function SearchButton(props: SearchButtonProps) {
  const { InputProps, label, fullWidth = false, sx = [], ...textFieldProps } = props
  const classes = withState({ fullWidth })

  return (
    <TextField
      variant='outlined'
      size='small'
      className={classes.root}
      label={label ?? <Trans id='Search...' />}
      id='search-input'
      InputLabelProps={{ shrink: false }}
      InputProps={{
        readOnly: true,
        endAdornment: <IconSvg src={iconSearch} size='medium' />,
        classes: { root: classes.inputRoot },
        ...InputProps,
      }}
      {...textFieldProps}
      sx={[
        (theme) => ({
          marginRight: theme.spacings.xxs,
          width: responsiveVal(64, 172),
          '& fieldset': {
            border: `1px solid ${theme.palette.divider}`,
          },
          [theme.breakpoints.down('md')]: {
            width: '100%',
            marginRight: 0,
          },
          '&.fullWidth': {
            width: '100%',
            marginRight: 0,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
