import { Controller } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import type {
  CurrencyEnum,
  FilterRangeTypeInput,
  ProductAttributeFilterInput,
} from '@graphcommerce/graphql-mesh'
import { Money, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  ChipMenu,
  ChipMenuProps,
  extendableComponent,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { Box, Slider } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFilterForm } from './FilterFormContext'
import { ProductListFiltersFragment } from './ProductListFilters.gql'
import { useFilterActions } from './helpers/filterActions'

type FilterRangeTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipMenuProps, 'selected' | 'openEl' | 'setOpenEl'>

const { classes } = extendableComponent('FilterRangeType', ['root', 'container', 'slider'] as const)

export function FilterRangeType(props: FilterRangeTypeProps) {
  const { attribute_code, label, options, ...chipProps } = props
  const currency = useQuery(StoreConfigDocument).data?.storeConfig?.base_currency_code
  const {
    form: { control },
  } = useFilterForm()
  const router = useRouter()
  const { emptyFilters, resetFilters } = useFilterActions({
    attribute_code,
  })
  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)
  const values = filterNonNullableKeys(options)
    ?.map((v) => v?.value.split('_').map((mv) => Number(mv)))
    .flat(1)

  const handleClose = () => {
    setOpenEl(null)
  }

  if (options === (null || undefined)) return null

  const name = `${attribute_code}` as keyof ProductAttributeFilterInput
  const initialFrom = values?.[0]
  const initialTo = values?.[values.length - 1]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const typedValue = value as FilterRangeTypeInput | undefined
        const from = Number(typedValue?.from ?? initialFrom)
        const to = Number(typedValue?.to ?? initialTo)

        const fromElement = <Money currency={currency as CurrencyEnum} value={from} />
        const toElement = <Money currency={currency as CurrencyEnum} value={to} />
        const hasValue =
          typedValue?.from !== undefined && Number(typedValue?.from) >= 0 && typedValue?.to
        const l = hasValue ? (
          <>
            {fromElement} - {toElement}
          </>
        ) : (
          label
        )
        return (
          <ChipMenu
            {...chipProps}
            variant='outlined'
            label={l}
            selected={router.asPath.includes('price')}
            openEl={openEl}
            setOpenEl={setOpenEl}
            onClose={handleClose}
            className={classes.root}
            onReset={() => emptyFilters()}
          >
            <Box
              sx={(theme) => ({
                padding: `${theme.spacings.xxs} ${theme.spacings.xxs} !important`,
                width: '100%',
              })}
              className={classes.container}
            >
              <Box>
                <Money round value={from} />
                {typedValue?.to ? ' — ' : false}
                <Money round value={to} />
                <Slider
                  min={values ? values[0] : 0}
                  max={values ? values[values.length - 1] : 0}
                  aria-labelledby='range-slider'
                  value={[from, to]}
                  onChange={(_e, newValue) => {
                    onChange({ from: newValue[0], to: newValue[1] })
                  }}
                  valueLabelDisplay='off'
                  className={classes.slider}
                  step={null}
                  marks={values?.map((v) => ({ value: v, label: '' }))}
                />
              </Box>
            </Box>
          </ChipMenu>
        )
      }}
    />
  )
}
