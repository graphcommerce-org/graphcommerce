import { iconHome, IconSvg, ActionCardList } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, Link } from '@mui/material'
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

  return (
    <Box
      onClick={(e) => {
        handleClick(e)
      }}
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
    </Box>
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
        {console.log(address)}
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
          title='Frank Harland'
          details={<Box>Kardoen 5, 2371DS Roelofarendsveen, Nederland</Box>}
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
