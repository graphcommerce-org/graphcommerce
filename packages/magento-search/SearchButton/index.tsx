import { iconSearch, responsiveVal, SvgIcon, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { TextField, TextFieldProps } from '@mui/material'

export type SearchButtonProps = TextFieldProps

type OwnerState = { fullWidth?: boolean }
const name = 'SearchButton' as const
const parts = ['root', 'inputRoot'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export default function SearchButton(props: SearchButtonProps) {
  const { InputProps, label, fullWidth = false, sx = [], ...textFieldProps } = props
  const classes = withState({ fullWidth })

  return (
    <TextField
      variant='outlined'
      size='small'
      className={classes.root}
      label={label ?? <Trans>Search...</Trans>}
      id='search-input'
      InputLabelProps={{ shrink: false }}
      InputProps={{
        readOnly: true,
        endAdornment: <SvgIcon src={iconSearch} size='medium' />,
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
