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
  TextInputNumber,
  TextInputNumberProps,
} from '@graphcommerce/next-ui'
import { Box, Container, Typography, Divider, styled } from '@mui/material'
import React, { useState } from 'react'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'
import { Form, NumberFieldElement, useForm } from '@graphcommerce/ecommerce-ui'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'

const variants = ['outlined', 'standard'] as const
const sizes = ['small', 'medium'] as const
const colors = [undefined, 'primary', 'secondary', 'error'] as const

const Grid = styled('div')(({ theme }) => ({
  marginTop: `${5 * 8}px`,
  marginBottom: `${5 * 8}px`,
  display: 'grid',
  gridTemplateColumns: `repeat(4, minmax(180px, 1fr))`,
  gap: responsiveVal(20, 40),
}))

export default function NumberInputsPage(props: TextInputNumberProps) {
  const { control } = useForm()
  return (
    <>
      <Container>
        <LayoutTitle variant='h1'>TextInputNumber inputs</LayoutTitle>

        {variants.map((variant) => (
          <React.Fragment key={variant}>
            {/* <Typography variant='h3'>Variant: {variant}</Typography> */}
            <Grid>
              {colors.map((color) => (
                <Box>
                  <Box
                    sx={{
                      backgroundColor: `${color}.main`,
                      width: '1em',
                      height: '1em',
                      display: 'inline-block',
                    }}
                  />
                  <p></p>
                  <Typography
                    key={color}
                    variant='h6'
                    sx={{
                      alignItems: 'center',

                      columnGap: 1,
                    }}
                  >
                    Input {variant} {color}
                  </Typography>
                </Box>
              ))}

              {sizes.map((size) => (
                <React.Fragment key={size}>
                  {colors.map((color) => (
                    <div key={color}>
                      <TextInputNumber
                        // label='Quantity'
                        color={color}
                        defaultValue={0}
                        variant={variant}
                        size={size}
                        {...props}
                        InputProps={{ disableUnderline: true }}
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </Grid>
            <Divider />
          </React.Fragment>
        ))}
      </Container>
      <Container>
        <LayoutTitle variant='h1'>NumberFieldElement inputs</LayoutTitle>
        {variants.map((variant) => (
          <React.Fragment key={variant}>
            <Grid>
              {colors.map((color) => (
                <Box>
                  <Box
                    sx={{
                      backgroundColor: `${color}.main`,
                      width: '1em',
                      height: '1em',
                      display: 'inline-block',
                    }}
                  />
                  <p></p>
                  <Typography
                    key={color}
                    variant='h6'
                    sx={{
                      alignItems: 'center',

                      columnGap: 1,
                    }}
                  >
                    Input {variant} {color}
                  </Typography>
                </Box>
              ))}

              {sizes.map((size) => (
                <React.Fragment key={size}>
                  {colors.map((color) => (
                    <div key={color}>
                      <NumberFieldElement
                        variant={variant}
                        size={size}
                        color={color}
                        {...props}
                        required
                        inputProps={{ min: 1 }}
                        defaultValue={1}
                        control={control}
                        InputProps={{ disableUnderline: true }}
                        name='test'
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </Grid>
            <Divider />
          </React.Fragment>
        ))}
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  layoutProps: {},
}
NumberInputsPage.pageOptions = pageOptions

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
