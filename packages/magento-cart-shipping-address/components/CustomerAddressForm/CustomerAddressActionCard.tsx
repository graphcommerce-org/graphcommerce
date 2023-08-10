import { CustomerAddressFragment } from '@graphcommerce/magento-customer/components/CreateCustomerAddressForm/CustomerAddress.gql'
import { useFindCountry } from '@graphcommerce/magento-store'
import { ActionCard, IconSvg, iconHome, ActionCardItemRenderProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

type CustomerAddressActionCardProps = ActionCardItemRenderProps<
  CustomerAddressFragment | null | undefined
>

export function CustomerAddressActionCard(props: CustomerAddressActionCardProps) {
  const {
    onReset,
    company,
    firstname,
    lastname,
    street,
    postcode,
    city,
    country_code,
    region,
    id,
    ...cardProps
  } = props
  const { push } = useRouter()
  const country = useFindCountry(country_code)

  if (cardProps.value === -1) {
    return (
      <ActionCard
        image={<IconSvg src={iconHome} size='large' />}
        title={<Trans id='New address' />}
        details={<Trans id='Add new address' />}
        action={
          <Button disableTouchRipple variant='inline' color='secondary' tabIndex={-1}>
            <Trans id='Select' />
          </Button>
        }
        reset={
          <Button disableTouchRipple variant='inline' color='secondary' onClick={onReset}>
            <Trans id='Change' />
          </Button>
        }
        {...cardProps}
      />
    )
  }

  return (
    <ActionCard
      image={<IconSvg src={iconHome} size='large' />}
      title={
        <>
          {street?.join(' ')}, {city}
        </>
      }
      details={
        <>
          {company} {firstname} {lastname} ({postcode}, {region?.region_code}{' '}
          {country?.full_name_locale})
        </>
      }
      action={
        <Button disableTouchRipple variant='inline' color='secondary' tabIndex={-1}>
          <Trans id='Select' />
        </Button>
      }
      reset={
        <Button disableTouchRipple variant='inline' color='secondary' onClick={onReset}>
          <Trans id='Change' />
        </Button>
      }
      secondaryAction={
        <Button
          color='secondary'
          variant='inline'
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            push(`/checkout/customer/addresses/edit?addressId=${id}`)
          }}
        >
          <Trans id='Edit address' />
        </Button>
      }
      {...cardProps}
    />
  )
}
