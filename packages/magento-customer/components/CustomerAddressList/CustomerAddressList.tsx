import { iconHome, IconSvg, ActionCardList } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, Link, ButtonBase } from '@mui/material'
import { FormEvent } from 'react'
import { AccountAddressesFragment } from '../AccountAddresses/AccountAddresses.gql'

type CustomerAddressListProps = AccountAddressesFragment
type ActionCardProps = {
  sx?: SxProps<Theme>
  title?: string
  image?: React.ReactNode
  action?: React.ReactNode
  details?: React.ReactNode
  secondaryAction?: React.ReactNode
  // eslint-disable-next-line react/no-unused-prop-types
  onClick?: (e: React.MouseEvent) => void
}

function ActionCard(props: ActionCardProps) {
  const { title, image, action, details, secondaryAction, sx = [], onClick } = props

  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      onClick(event)
    }
  }

  // TODO
  // 1. Selected state for Actioncard
  // 2. In ActionCardList make other options dissapear
  //  2.1 Change selected ActionCard primary action to 'Change'
  //  2.2 Animations
  // 3. Mutations for setting shipping/billing address

  return (
    <ButtonBase
      onClick={(e) => {
        handleClick(e)
      }}
      component='div'
      sx={[
        {
          display: 'grid',
          width: '100%',
          gridTemplateColumns: 'min-content',
          gridTemplateAreas: `
        "image title action"
        "image details secondaryDetails"
        "image secondaryAction additionalDetails"
        "additionalContent additionalContent additionalContent"
        `,
          justifyContent: 'unset',
        },
        (theme) => ({
          background: theme.palette.background.paper,
          padding: theme.spacings.xs,
          columnGap: theme.spacings.xxs,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className='ActionCard-root'
    >
      {image && <Box sx={{ gridArea: 'image', justifySelf: 'center', padding: 1 }}>{image}</Box>}
      {title && <Box sx={{ gridArea: 'title', fontWeight: 'bold' }}>{title}</Box>}
      {action && <Box sx={{ gridArea: 'action', textAlign: 'right' }}>{action}</Box>}
      {details && <Box sx={{ gridArea: 'details' }}>{details}</Box>}
      {secondaryAction && <Box sx={{ gridArea: 'secondaryAction' }}>{secondaryAction}</Box>}
    </ButtonBase>
  )
}

export function CustomerAddressList(props: CustomerAddressListProps) {
  const { addresses } = props
  if (!addresses) return null

  const handleAddressSelect = () => {
    console.log('you selected the address')
  }

  return (
    <ActionCardList>
      {addresses.map((address, index) => (
        <ActionCard
          onClick={() => {
            handleAddressSelect()
          }}
          key={index}
          action={
            <Box>
              <Link href='#' underline='none' color='secondary'>
                Select
              </Link>
            </Box>
          }
          image={<IconSvg src={iconHome} size='large' />}
          title={`${address?.firstname} ${address?.lastname}`}
          details={
            <Box>
              {address?.street?.join(' ')}, {address?.postcode}, {address?.city},{' '}
              {address?.country_code}
            </Box>
          }
          secondaryAction={
            <Link underline='none' color='secondary'>
              Edit address
            </Link>
          }
        />
      ))}
    </ActionCardList>
  )
}
