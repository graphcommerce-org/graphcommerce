import { Image, ImageProps } from '@graphcommerce/image'
import { responsiveVal, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { ButtonBase, Typography, Box, styled, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useMemo } from 'react'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { useProductLink } from '../../hooks/useProductLink'
import { ProductListPrice } from '../ProductListPrice/ProductListPrice'

const { classes, selectors } = extendableComponent('ProductListItem', [
  'root',
  'item',
  'title',
  'titleContainer',
  'subtitle',
  'price',
  'overlayItems',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'imageContainer',
  'placeholder',
  'image',
  'discount',
] as const)

export type OverlayAreaKeys = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight'

export type OverlayAreas = Partial<Record<OverlayAreaKeys, React.ReactNode>>

type StyleProps = {
  aspectRatio?: [number, number]
  imageOnly?: boolean
}

type BaseProps = PropsWithChildren<
  { subTitle?: React.ReactNode } & StyleProps &
    OverlayAreas &
    ProductListItemFragment &
    Pick<ImageProps, 'loading' | 'sizes' | 'dontReportWronglySizedImages'>
>

export type ProductListItemProps = BaseProps & { sx?: SxProps<Theme> }

const StyledImage = styled(Image)({})

export function ProductListItem(props: ProductListItemProps) {
  const {
    subTitle,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    small_image,
    name,
    price_range,
    children,
    imageOnly = false,
    loading,
    sizes,
    dontReportWronglySizedImages,
    aspectRatio = [4, 3],
    sx = [],
  } = props

  const productLink = useProductLink(props)
  const discount = Math.floor(price_range.minimum_price.discount?.percent_off ?? 0)
  const { locale } = useRouter()

  const formatter = useMemo(
    () => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 }),
    [locale],
  )

  return (
    <PageLink href={productLink} passHref>
      <ButtonBase
        component='a'
        sx={[
          (theme) => ({
            display: 'block',
            position: 'relative',
            height: '100%',
            borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        className={classes.root}
      >
        <Box
          sx={(theme) => ({
            display: 'grid',
            bgcolor: 'background.image',
            borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
            padding: responsiveVal(8, 12),
            '& > picture': {
              gridArea: `1 / 1 / 3 / 3`,
              margin: `calc(${responsiveVal(8, 12)} * -1)`,
            },
          })}
          className={classes.imageContainer}
        >
          {small_image ? (
            <StyledImage
              layout='fill'
              width={1}
              height={1}
              sizes={sizes}
              dontReportWronglySizedImages={dontReportWronglySizedImages}
              src={small_image.url ?? ''}
              alt={small_image.label ?? ''}
              className={classes.image}
              loading={loading}
              sx={{ objectFit: 'contain', aspectRatio: `${aspectRatio[0] / aspectRatio[1]}` }}
            />
          ) : (
            <Box
              sx={{
                gridArea: `1 / 1 / 3 / 3`,
                typography: 'caption',
                display: 'flex',
                textAlign: 'center',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'background.default',
                userSelect: 'none',
              }}
              className={`${classes.placeholder} ${classes.image}`}
            >
              <Trans>No Image</Trans>
            </Box>
          )}

          {!imageOnly && (
            <>
              <Box
                sx={{
                  gridArea: `1 / 1 / 2 / 2`,
                  zIndex: 1,
                }}
                className={classes.topLeft}
              >
                {discount > 0 && (
                  <Box
                    className={classes.discount}
                    sx={{
                      typography: 'caption',
                      bgcolor: 'text.primary',
                      fontWeight: 'fontWeightBold',
                      border: 1,
                      borderColor: 'divider',
                      padding: '0px 6px',
                      color: 'background.default',
                      display: 'inline-block',
                    }}
                  >
                    {formatter.format(discount / -100)}
                  </Box>
                )}
                {topLeft}
              </Box>
              <Box
                sx={{
                  justifySelf: 'end',
                  textAlign: 'right',
                  gridArea: `1 / 2 / 2 / 3`,
                  zIndex: 1,
                }}
                className={classes.topLeft}
              >
                {topRight}
              </Box>
              <Box
                sx={{
                  alignSelf: 'flex-end',
                  gridArea: `2 / 1 / 3 / 2`,
                  zIndex: 1,
                }}
                className={classes.bottomLeft}
              >
                {bottomLeft}
              </Box>
              <Box
                sx={{
                  textAlign: 'right',
                  alignSelf: 'flex-end',
                  gridArea: `2 / 2 / 3 / 3`,
                  zIndex: 1,
                  justifySelf: 'end',
                }}
                className={classes.bottomRight}
              >
                {bottomRight}
              </Box>
            </>
          )}
        </Box>

        {!imageOnly && (
          <>
            <Box
              className={classes.titleContainer}
              sx={(theme) => ({
                display: 'grid',
                alignItems: 'baseline',
                marginTop: theme.spacings.xs,
                columnGap: 1,
                gridTemplateAreas: {
                  xs: `"title title" "subtitle price"`,
                  md: `"title subtitle price"`,
                },
                gridTemplateColumns: { xs: 'unset', md: 'auto auto 1fr' },
                justifyContent: 'space-between',
              })}
            >
              <Typography
                component='h2'
                variant='subtitle1'
                sx={{
                  display: 'inline',
                  color: 'text.primary',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-all',
                  maxWidth: '100%',
                  gridArea: 'title',
                  fontWeight: 'fontWeightBold',
                }}
                className={classes.title}
              >
                {name}
              </Typography>
              <Box sx={{ gridArea: 'subtitle' }} className={classes.subtitle}>
                {subTitle}
              </Box>

              <ProductListPrice
                {...price_range.minimum_price}
                sx={{
                  gridArea: 'price',
                  textAlign: 'right',
                  justifySelf: { sm: 'flex-end' },
                }}
              />
            </Box>
            {children}
          </>
        )}
      </ButtonBase>
    </PageLink>
  )
}

ProductListItem.selectors = { ...selectors, ...ProductListPrice.selectors }
