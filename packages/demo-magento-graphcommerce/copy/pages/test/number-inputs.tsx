import { NumberFieldElement, useForm } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps, TextInputNumberProps } from '@graphcommerce/next-ui'
import { LayoutHeader, LayoutTitle, responsiveVal, TextInputNumber } from '@graphcommerce/next-ui'
import { Box, Container, Divider, styled, Typography } from '@mui/material'
import React from 'react'
import type { LayoutMinimalProps } from '../../components'
import { LayoutMinimal } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

const variants = ['outlined', 'standard'] as const
const sizes = ['small', 'medium'] as const
const colors = [undefined, 'primary', 'secondary', 'error'] as const

const Grid = styled('div')(() => ({
  marginTop: `${5 * 8}px`,
  marginBottom: `${5 * 8}px`,
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))',
  gap: responsiveVal(20, 40),
}))

export default function NumberInputsPage(props: TextInputNumberProps) {
  const { control } = useForm()
  return (
    <>
      <LayoutHeader />
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
                  <p />
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
                        inputProps={{ min: 1 }}
                        defaultValue={1}
                        control={control}
                        InputProps={{ disableUnderline: true }}
                        name='test'
                        sx={{
                          marginBottom: '10px',
                        }}
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

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
