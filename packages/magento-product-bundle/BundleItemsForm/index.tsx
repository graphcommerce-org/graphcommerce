import { makeStyles, Theme } from '@material-ui/core'
import { ProductAddToCartDocument } from '@reachdigital/magento-product/ProductAddToCart/ProductAddToCart.gql'
import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import ToggleButton from '@reachdigital/next-ui/ToggleButton'
import ToggleButtonGroup from '@reachdigital/next-ui/ToggleButtonGroup'
import React from 'react'
import { useFormGqlMutationCart } from '../../magento-cart'
import SectionContainer from '../../next-ui/SectionContainer'
import { Controller, useFormGqlMutation } from '../../react-hook-form'
import { BundleItemsFragment } from './BundleItems.gql'

type BundleItemsFormProps = BundleItemsFragment

type ItemType = 'radio' | 'checkbox' | 'select' | 'multiselect'

const useStyles = makeStyles(
  (theme: Theme) => ({
    labelInnerContainer: {
      borderBottom: 'none',
      padding: `${theme.spacings.md} 0`,
      [theme.breakpoints.up('md')]: {
        padding: `${theme.spacings.xs} 0`,
      },
    },
    toggleButtonGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: theme.spacings.xxs,
    },
    toggleButton: {
      minHeight: theme.spacings.lg,
    },
    button: {
      marginTop: theme.spacings.sm,
      width: '100%',
    },
  }),
  { name: 'BundleItems' },
)

export default function BundleItemsForm(props: BundleItemsFormProps) {
  const { items, sku, ...buttonProps } = props
  const classes = useStyles()

  const form = useFormGqlMutationCart(ProductAddToCartDocument, {
    defaultValues: {
      sku: sku ?? '',
      quantity: 1,
    },
  })
  const { control, handleSubmit, formState } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      {items?.map((item, idx) => {
        if (!item?.type) return null
        const type = item.type as ItemType
        const exclusive = type === 'select' || type === 'radio'

        return (
          <div key={item?.uid ?? ''}>
            <SectionContainer
              label={`Choose your ${item?.title}`}
              classes={{
                labelInnerContainer: classes.labelInnerContainer,
              }}
              borderBottom={false}
            >
              <Controller
                defaultValue=''
                control={control}
                name={`selectedOptions.${idx}`}
                rules={{ required: 'Please select a payment method' }}
                render={({ field: { onChange, value, name, ref, onBlur } }) => (
                  <ToggleButtonGroup
                    required={Boolean(item?.required)}
                    exclusive={exclusive}
                    minWidth={100}
                    classes={{ root: classes.toggleButtonGroup }}
                    onChange={(_, val: string) => {
                      onChange(val)
                    }}
                    onBlur={onBlur}
                    value={value}
                  >
                    {item?.options?.map((option) => (
                      <ToggleButton
                        key={option?.uid}
                        value={option?.uid ?? ''}
                        name={name}
                        className={classes.toggleButton}
                      >
                        {option?.label}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                )}
              />
            </SectionContainer>
          </div>
        )
      })}
      <Button
        type='submit'
        classes={{ root: classes.button }}
        loading={formState.isSubmitting}
        color='primary'
        variant='pill'
        size='large'
        {...buttonProps}
      >
        Add to Cart
      </Button>
    </form>
  )
}
