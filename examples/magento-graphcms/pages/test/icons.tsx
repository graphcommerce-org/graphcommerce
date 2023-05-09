import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  LayoutTitle,
  IconSvg,
  IconSvgProps,
  svgIconStrokeWidth,
  iconPhone,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Container, Typography, Slider, Box } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { getLayout } from '../../components/Layout/layout'

const propVariants: Record<string, IconSvgProps> = {
  Default: {
    src: iconPhone,
  },
}

export default function IconsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
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
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  layoutProps: {},
}
IconsPage.pageOptions = pageOptions

export const getStaticProps = enhanceStaticProps(getLayout)
