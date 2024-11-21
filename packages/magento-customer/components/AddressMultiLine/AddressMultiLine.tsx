import { useFindCountry } from '@graphcommerce/magento-store'
import { extendableComponent } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Typography } from '@mui/material'
import type { CustomerAddressFragment } from '../CreateCustomerAddressForm/CustomerAddress.gql'

// exports.getEuMembers = function()
// {
// 	return ["BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", "ES", "FR", "HR", "IT", "CY", "LV", "LT", "LU", "HU", "MT", "NL", "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE"];
// };
// exports.isEuMember = function(code)
// {
// 	return exports.getEuMembers().indexOf(code.toUpperCase()) != -1;
// };

type AddressMultiLineProps = CustomerAddressFragment & { sx?: SxProps<Theme> }

const name = 'AddressMultiLine'
const parts = ['root', 'title'] as const
const { classes } = extendableComponent(name, parts)

export function AddressMultiLine(props: AddressMultiLineProps) {
  const {
    company,
    prefix,
    firstname,
    lastname,
    middlename,
    suffix,
    street,
    region,
    city,
    postcode,
    country_code,
    telephone,
    vat_id,
    sx = [],
  } = props
  const countryName = useFindCountry(country_code)?.full_name_locale ?? country_code

  const regionName = typeof region === 'string' ? region : region?.region

  return (
    <Typography variant='body1' component='div' className={classes.root} sx={sx}>
      <div className={classes.title}>
        <div>{company}</div>
        <div>
          {prefix} {firstname} {middlename} {lastname} {suffix}
        </div>
      </div>
      <div>
        {street?.[0]} {street?.slice(1).join('')}
      </div>
      <div>
        {postcode} {city}
      </div>
      <div>
        {regionName && `${regionName}, `}
        {countryName}
      </div>
      <div>{telephone}</div>
      <div>{vat_id}</div>
    </Typography>
  )
}
