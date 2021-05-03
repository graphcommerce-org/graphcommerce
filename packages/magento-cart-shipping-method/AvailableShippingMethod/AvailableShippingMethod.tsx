import { FormHelperText, makeStyles, Theme } from '@material-ui/core'
import { Money } from '@reachdigital/magento-store'
import ToggleButton, { ToggleButtonProps } from '@reachdigital/next-ui/ToggleButton'
import clsx from 'clsx'
import React from 'react'
import { AvailableShippingMethodFragment } from './AvailableShippingMethod.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      textAlign: 'left',
      justifyContent: 'space-between',
      alignItems: 'normal',
    },
    label: {
      display: 'grid',
      gridTemplate: `
        "title      amount"
        "additional additional"
        "error      error"
      `,
      gridTemplateColumns: 'auto min-content',
      columnGap: theme.spacings.xxs,
    },
    methodTitle: {
      gridArea: 'title',
      fontWeight: theme.typography.fontWeightBold,
    },
    methodAdditional: {
      gridArea: 'additional',
    },
    errorMessage: {
      gridArea: 'error',
    },
    amountLabel: {
      gridArea: 'amount',
      fontWeight: theme.typography.fontWeightBold,
    },
    amountLabelFree: {
      color: theme.palette.success.main,
    },
  }),
  { name: 'ShippingMethodToggleButton' },
)

type AvailableShippingMethodProps = AvailableShippingMethodFragment &
  Omit<ToggleButtonProps, 'size' | 'disabled'>

const AvailableShippingMethod = React.forwardRef<any, AvailableShippingMethodProps>(
  (props, ref) => {
    const {
      amount,
      available,
      carrier_code,
      carrier_title,
      error_message,
      method_code,
      method_title,
      children,
      ...toggleProps
    } = props
    const {
      amountLabel,
      amountLabelFree,
      methodTitle,
      methodAdditional,
      errorMessage,
      ...classes
    } = useStyles(props)

    return (
      <ToggleButton {...toggleProps} classes={classes} ref={ref} disabled={!available} size='large'>
        <div className={methodTitle}>
          {carrier_title} {method_title}
        </div>
        {amount.value === 0 ? (
          <div className={clsx(amountLabel, amountLabelFree)}>Free</div>
        ) : (
          <div className={amountLabel}>
            <Money {...amount} />
          </div>
        )}

        {error_message ? (
          <FormHelperText className={errorMessage} disabled>
            {error_message}
          </FormHelperText>
        ) : (
          children && <div className={methodAdditional}>{children}</div>
        )}
      </ToggleButton>
    )
  },
)

export default AvailableShippingMethod
