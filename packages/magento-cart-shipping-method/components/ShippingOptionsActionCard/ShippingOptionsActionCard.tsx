import { title } from 'process'
import { Money } from '@graphcommerce/magento-store'
import { sx } from '@graphcommerce/next-ui'
import { ActionCardItemRenderer } from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { UseFormSetValue } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Box, Button, ButtonBase, SxProps, Typography } from '@mui/material'
import { FormEvent } from 'react'
import { AvailableShippingMethodFragment } from '../../AvailableShippingMethod/AvailableShippingMethod.gql'
import { ShippingMethodFormMutationVariables } from '../ShippingMethodForm/ShippingMethodForm.gql'

type ShippingOptionsActionCardProps = ActionCardItemRenderer<
  | (AvailableShippingMethodFragment & {
      onClick?: (e: FormEvent<HTMLElement>, cm: string) => void
      value: string
      setValue: UseFormSetValue<ShippingMethodFormMutationVariables>
    })
  | null
  | undefined
>

export function ShippingOptionsActionCard(props: ShippingOptionsActionCardProps) {
  const {
    onReset,
    available,
    selected,
    amount,
    carrier_title,
    onClick,
    value,
    method_code,
    carrier_code,
    error_message,
    setValue,
  } = props

  const handleClick = (event: FormEvent<HTMLElement>) => {
    onClick?.(event, value)
    setValue('carrier', carrier_code)
    setValue('method', method_code ?? '')
  }

  const actionButtonStyles: SxProps = {
    '& .MuiButton-root': {
      '&.MuiButton-textSecondary': {
        padding: '5px',
        margin: '-5px',
        '&:hover': {
          background: 'none',
        },
      },
    },
  }

  return (
    <ButtonBase
      component='div'
      className='ActionCard-root'
      onClick={handleClick}
      disabled={!available}
      sx={[
        (theme) => ({
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          typography: 'body1',
          background: theme.palette.background.paper,
          padding: `calc(${theme.spacings.xxs} + 1px) calc(${theme.spacings.xs} + 1px)`,
          columnGap: theme.spacings.xxs,
          border: `1px solid ${theme.palette.divider}`,
          borderBottomColor: `transparent`,
          '&:first-of-type': {
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
          },
          '&:last-of-type': {
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }),
        !!selected &&
          ((theme) => ({
            border: `2px solid ${theme.palette.secondary.main} !important`,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
            padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,
          })),
        !available &&
          ((theme) => ({
            background: theme.palette.grey[200],
            alignItems: { xs: 'flex-start', md: 'center' },
          })),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {title && (
        <Box
          sx={{ gridArea: 'title', fontWeight: 'bold', display: 'flex', flexDirection: 'column' }}
        >
          {carrier_title}
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            {error_message}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Box>
          {available && (
            <>
              {amount?.value !== undefined && amount?.value !== null && amount?.value > 0 ? (
                <Money {...amount} />
              ) : (
                <Typography variant='h5' color='#05C642'>
                  <Trans id='Free' />
                </Typography>
              )}
            </>
          )}
          {!available && (
            <Typography variant='body1' color='text.disabled'>
              <Trans id='Unavailable' />
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            gridArea: 'action',
            textAlign: 'right',
            marginLeft: '20px',
            display: available ? 'flex' : 'none',
            ...actionButtonStyles,
          }}
        >
          <>
            {!selected ? (
              <Button disableRipple variant='text' color='secondary'>
                <Trans id='Select' />
              </Button>
            ) : (
              <Button disableRipple variant='text' color='secondary' onClick={onReset}>
                <Trans id='Change' />
              </Button>
            )}
          </>
        </Box>
      </Box>
    </ButtonBase>
  )
}
