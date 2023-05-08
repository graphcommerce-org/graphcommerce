import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  LayoutTitle,
  responsiveVal,
  IconSvg,
  iconChevronRight,
  iconBox,
  Button,
  ButtonProps,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Box, Container, Typography, Divider, styled } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import React, { useState } from 'react'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'

const variants = ['text', 'outlined', 'contained', 'pill', 'inline'] as const
const sizes = ['small', 'medium', 'large'] as const
const colors = ['inherit', 'primary', 'secondary'] as const

const propVariants: Record<string, ButtonProps> = {
  Default: {},
  'With start icon': {
    startIcon: <IconSvg key='icon' src={iconBox} size='inherit' />,
    loadingPosition: 'start',
  },
  'With end icon': {
    endIcon: <IconSvg key='icon' src={iconChevronRight} size='inherit' />,
    loadingPosition: 'end',
  },
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

function ButtonWithDemoState(props: ButtonProps) {
  const [loading, setLoading] = useState(false)

  return (
    <Button
      {...props}
      loading={loading}
      // disabled={loading}
      onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
      }}
    />
  )
}

export default function ButtonsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <LayoutTitle variant='h1'>Buttons</LayoutTitle>

      {Object.entries(propVariants).map(([propVariant, variantProps]) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={propVariant}>
          <Typography variant='h2' sx={{ mt: 8 }}>
            {propVariant}
          </Typography>
          {variants.map((variant) => (
            <React.Fragment key={variant}>
              {/* <Typography variant='h3'>Variant: {variant}</Typography> */}
              <Grid>
                {colors.map((color) => (
                  <Typography
                    key={color}
                    variant='h6'
                    sx={{ display: 'inline-flex', alignItems: 'center', columnGap: 1 }}
                  >
                    Button {variant} {color}
                    <Box
                      sx={{
                        backgroundColor: `${color}.main`,
                        width: '1em',
                        height: '1em',
                        display: 'inline-block',
                      }}
                    />
                  </Typography>
                ))}

                {sizes.map((size) => (
                  <React.Fragment key={size}>
                    {colors.map((color) => (
                      <div key={color}>
                        <ButtonWithDemoState
                          variant={variant}
                          color={color}
                          size={size}
                          {...variantProps}
                          onClick={() => {}}
                        >
                          Button
                        </ButtonWithDemoState>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </Grid>
              <Divider />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </Container>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  layoutProps: {},
}
ButtonsPage.pageOptions = pageOptions

export const getStaticProps = enhanceStaticProps<LayoutMinimalProps>(() => ({ props: {} }))
