import { makeStyles, Theme } from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-store/CountryRegions.gql'
import { CustomerAddressFragment } from '../CustomerAddress/CustomerAddress.gql'
import { OrderAddressFragment } from '../OrderAddress/OrderAddress.gql'
import useCountry from '../useCountry'

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
      fontWeight: 'bold',
      paddingBottom: theme.spacings.xxs,
    },
  }),
  {
    name: 'AddressMultiLine',
  },
)

type AddressMultiLineProps = (CustomerAddressFragment | OrderAddressFragment) & CountryRegionsQuery

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
    countries,
  } = props
  const countryName = useCountry(countries, country_code ?? '')?.full_name_locale
  const regionName = typeof region === 'string' ? region : region?.region
  const classes = useStyles()

  // todo: detect correct format by locale
  // for now, US format will be returned by default

  return (
    <div>
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
        {regionName && `${regionName},`}
        {countryName}
      </div>
    </div>
  )
}
