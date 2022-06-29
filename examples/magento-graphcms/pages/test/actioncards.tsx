import { useForm } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  LayoutTitle,
  responsiveVal,
  IconSvg,
  iconChevronRight,
  iconBox,
  GetStaticProps,
  Button,
  ButtonProps,
  ActionCardProps,
  ActionCard,
} from '@graphcommerce/next-ui'
import { ActionCardListForm } from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { Box, Container, Typography, Divider, styled } from '@mui/material'
import React, { useState } from 'react'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

const variants = ['default', 'outlined'] as const
const sizes = ['small', 'medium', 'large'] as const

const propVariants: Record<string, ButtonProps> = {
  Default: {},
  Outlined: {},
}

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

function ActionCardWithDemoState(props: ActionCardProps) {
  return <ActionCard {...props} hidden={false} />
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
                      demoData.map((data) => ({
                        ...data,
                        variant,
                      })) ?? []
                    }
                    error={false}
                    render={ActionCardWithDemoState}
                  />
                </React.Fragment>
              ))}
            </Grid>
            <Divider />
          </React.Fragment>
        ))}
      </>
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
