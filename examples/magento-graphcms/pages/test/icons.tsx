import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  LayoutTitle,
  IconSvg,
  GetStaticProps,
  IconSvgProps,
  svgIconStrokeWidth,
  iconPhone,
  LayoutHeader,
} from '@graphcommerce/next-ui'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Container, Typography, Slider, Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

const propVariants: Record<string, IconSvgProps> = {
  Default: {
    src: iconPhone,
  },
}

export default function IconsPage() {
  const [size, setSize] = useState<number>(24)
  const [strokeComputed, setStrokeWidth] = useState<string>()
  const [fontSize, setFontSize] = useState<string>()
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!ref.current) return

    setStrokeWidth(getComputedStyle(ref.current).strokeWidth)
    setFontSize(ref.current.style.fontSize)
  }, [size])

  return (
    <>
      <LayoutHeader />
      <Container>
        <LayoutTitle variant='h1'>Icons</LayoutTitle>

        <Slider
          min={5}
          max={150}
          // step={12}
          defaultValue={24}
          onChange={(_, newValue) => setSize(newValue as number)}
          aria-label='Default'
          valueLabelDisplay='auto'
        />

        <Box>
          <code style={{ display: 'block' }}>font-size: {fontSize}</code>
          <code style={{ display: 'block' }}>
            stroke-width: {svgIconStrokeWidth(28, 148, 1.4, 0.8)}
          </code>
          <code style={{ display: 'block' }}>computed: {strokeComputed}</code>
        </Box>

        {Object.entries(propVariants).map(([propVariant, props]) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={propVariant}>
            <IconSvg {...props} style={{ fontSize: size }} ref={ref} />

            <Typography variant='h1' sx={{ mt: 8 }}>
              {propVariant} <IconSvg {...props} />
            </Typography>
            <Typography variant='h2' sx={{ mt: 8 }}>
              {propVariant}
              <IconSvg {...props} />
            </Typography>
            <Typography variant='h3' sx={{ mt: 8 }}>
              {propVariant} <IconSvg {...props} />
            </Typography>
            <Typography variant='h4' sx={{ mt: 8 }}>
              {propVariant}
              <IconSvg {...props} />
            </Typography>
            <Typography variant='h5' sx={{ mt: 8 }}>
              {propVariant}
              <IconSvg {...props} />
            </Typography>
            <Typography variant='h6' sx={{ mt: 8 }}>
              {propVariant}
              <IconSvg {...props} />
            </Typography>
            <Typography variant='subtitle1' sx={{ mt: 8 }}>
              {propVariant}
              <IconSvg {...props} />
            </Typography>
            <Typography variant='body1'>
              {propVariant}
              <IconSvg {...props} />
            </Typography>
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
IconsPage.pageOptions = pageOptions

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
