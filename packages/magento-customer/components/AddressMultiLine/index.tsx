import { makeStyles, Theme, Typography } from '@material-ui/core'
import { useFindCountry } from '@reachdigital/magento-store'
import { UseStyles } from '@reachdigital/next-ui'
import { CustomerAddressFragment } from '../CreateCustomerAddressForm/CustomerAddress.gql'

// exports.getEuMembers = function()
// {
// 	return ["BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", "ES", "FR", "HR", "IT", "CY", "LV", "LT", "LU", "HU", "MT", "NL", "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE"];
// };
// exports.isEuMember = function(code)
// {
// 	return exports.getEuMembers().indexOf(code.toUpperCase()) != -1;
// };

const useStyles = makeStyles(
  (theme: Theme) => ({
    title: {
      // fontWeight: 'bold',
      // paddingBottom: theme.spacings.xxs,
    },
  }),
  {
    name: 'AddressMultiLine',
  },
)

type AddressMultiLineProps = CustomerAddressFragment & UseStyles<typeof useStyles>

export default function AddressMultiLine(props: AddressMultiLineProps) {
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
  } = props
  const countryName = useFindCountry(country_code)?.full_name_locale ?? country_code

  const regionName = typeof region === 'string' ? region : region?.region
  const classes = useStyles(props)

  return (
    <Typography variant='body1' component='div'>
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
    </Typography>
  )
}
