import { useForm } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ConfigurableOptionsActionCard } from '@graphcommerce/magento-product-configurable'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  LayoutTitle,
  responsiveVal,
  GetStaticProps,
  Button,
  ActionCardProps,
  ActionCard,
} from '@graphcommerce/next-ui'
import {
  ActionCardItemRenderProps,
  ActionCardListForm,
} from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { Trans } from '@lingui/react'
import { Box, Container, Typography, Divider, styled } from '@mui/material'
import React from 'react'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

const variants = ['default', 'outlined'] as const
const sizes = ['small', 'medium', 'large'] as const

const options = [
  {
    attribute_code: 'size',
    label: 'Size',
    position: 0,
    uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE2NA==',
    values: [
      {
        store_label: '7 to 9 years',
        swatch_data: {
          __typename: 'TextSwatchData',
          value: '7-9Y',
        },
        uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE0NA==',
      },
      {
        store_label: '12 to 15 years',
        swatch_data: {
          __typename: 'TextSwatchData',
          value: '12-15Y',
        },
        uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE0NB==',
      },
      {
        store_label: '18+ years',
        swatch_data: {
          __typename: 'TextSwatchData',
          value: '18+Y',
        },
        uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE0NC==',
      },
    ],
  },
  {
    attribute_code: 'print_pattern_swatch',
    label: 'Pattern',
    position: 1,
    uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE1NB==',
    values: [
      {
        store_label: 'Kiwis',
        swatch_data: {
          __typename: 'ImageSwatchData',
          value: '/s/c/schermafbeelding_2022-06-22_om_10.54.47.png',
          thumbnail:
            'https://backend.reachdigital.dev/media/attribute/swatch/swatch_thumb/110x90/s/c/schermafbeelding_2022-06-22_om_10.54.47.png',
        },
        uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE0A1==',
      },
      {
        store_label: 'Oranges',
        swatch_data: {
          __typename: 'ImageSwatchData',
          thumbnail:
            'https://backend.reachdigital.dev/media/attribute/swatch/swatch_thumb/110x90/s/c/schermafbeelding_2022-06-22_om_10.54.58.png',
          value: '/s/c/schermafbeelding_2022-06-22_om_10.54.58.png',
        },
        uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE0A2==',
      },
      {
        store_label: 'Bunch of Fruit',
        swatch_data: {
          thumbnail:
            'https://backend.reachdigital.dev/media/attribute/swatch/swatch_thumb/110x90/s/c/schermafbeelding_2022-06-22_om_10.55.10.png',
          __typename: 'ImageSwatchData',
          value: '/s/c/schermafbeelding_2022-06-22_om_10.55.10.png',
        },
        uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE0A3==',
      },
    ],
  },
  {
    attribute_code: 'dominant_color',
    label: 'Color',
    position: 2,
    uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE1BB==',
    values: [
      {
        store_label: 'Purple',
        swatch_data: {
          __typename: 'ColorSwatchData',
          value: '#b832d0',
        },
        uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE0B1==',
      },
      {
        store_label: 'Turquoise',
        swatch_data: {
          __typename: 'ColorSwatchData',
          value: '#3ccdb7',
        },
        uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE0B2==',
      },
      {
        store_label: 'Yellow',
        swatch_data: {
          __typename: 'ColorSwatchData',
          value: '#ffe434',
        },
        uid: 'Y29uZmlndXJhYmxlLzUyMTU1LzE0B3==',
      },
    ],
  },
]

const Grid = styled('div')(({ theme }) => ({
  marginTop: `${5 * 8}px`,
  marginBottom: `${5 * 8}px`,
  display: 'grid',
  gridAutoFlow: 'columns',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: `repeat(3, minmax(180px, 1fr))`,
  },
  gap: responsiveVal(20, 40),
}))

function ActionCardWithDemoState(props: ActionCardItemRenderProps<ActionCardProps>) {
  const { size, onReset, price, details } = props
  return (
    <ActionCard
      {...props}
      price={size === 'small' ? undefined : price}
      details={size === 'small' ? undefined : details}
      action={
        size === 'large' ? (
          <Button disableRipple variant='inline' color='secondary'>
            <Trans id='Select' />
          </Button>
        ) : undefined
      }
      reset={
        <Button disableRipple variant='inline' color='secondary' onClick={onReset}>
          <Trans id='Change' />
        </Button>
      }
      secondaryAction={
        size === 'large' ? (
          <Button
            color='secondary'
            variant='inline'
            onMouseDown={(e) => {
              e.stopPropagation()
            }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <Trans id='What does this value mean?' />
          </Button>
        ) : undefined
      }
    />
  )
}

const demoData: ActionCardProps[] = [
  {
    value: 1,
    title: '4-6Y',
    details: '4 to 6 years',
    price: '$1.00',
  },
  {
    value: 2,
    title: '6-9Y',
    details: '6 to 9 years',
    price: '$10.00',
  },
  {
    value: 3,
    title: '36-40',
    details: 'Size 36 to 40',
    price: '$100.00',
  },
  {
    value: 4,
    title: '41-46',
    details: 'Size 41 to 46',
    price: '$1000.00',
  },
]

export default function ActionCardsPage() {
  const fieldName = `demo` as const
  const form = useForm()

  const { control } = form

  // const { values, label } = option
  return (
    <Container>
      <LayoutTitle variant='h1'>ActionCards</LayoutTitle>
      <>
        {variants.map((variant) => (
          <React.Fragment key={variant}>
            {/* <Typography variant='h3'>Variant: {variant}</Typography> */}
            <Typography variant='h2' sx={{ mt: 8 }}>
              {variant}
            </Typography>
            <Grid>
              {sizes.map((size) => (
                <React.Fragment key={size}>
                  <ActionCardListForm
                    key={fieldName}
                    name={fieldName}
                    control={control}
                    size={size}
                    required
                    items={
                      demoData.map((data, index) => ({
                        ...data,
                        variant,
                        value: `${size}-${index}-${variant}`,
                      })) ?? []
                    }
                    render={ActionCardWithDemoState}
                  />
                </React.Fragment>
              ))}
            </Grid>
            <Divider />
          </React.Fragment>
        ))}
      </>
      {options.map((option) => (
        <React.Fragment key={option?.attribute_code ?? ''}>
          <Typography variant='h2' sx={{ mt: 8, marginBottom: 2 }}>
            {option.label}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {sizes.map((size) => (
              <Box sx={{ marginX: 3 }}>
                <ActionCardListForm
                  key={fieldName}
                  name={fieldName}
                  control={control}
                  size={size}
                  required
                  items={(option.values ?? []).map((ov) => ({
                    value: ov?.uid ?? '',
                    ...ov,
                  }))}
                  render={ConfigurableOptionsActionCard}
                  sx={(theme) => ({
                    '&.selected': {
                      borderColor: `${theme.palette.primary.main} !important`,
                    },
                  })}
                />
              </Box>
            ))}
          </Box>
        </React.Fragment>
      ))}
    </Container>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  layoutProps: {},
}
ActionCardsPage.pageOptions = pageOptions

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
