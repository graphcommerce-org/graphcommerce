import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import {
  extendableComponent,
  DesktopHeaderBadge,
  IconSvg,
  useFabSize,
  iconBox,
  useScrollY,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { alpha, Fab, FabProps, styled, useTheme, Box, SxProps, Theme } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import React from 'react'
import { CompareListDocument } from '../graphql/CompareList.gql'
import { CurrentCompareUidDocument } from '../graphql/CurrentCompareUid.gql'


export type CompareFabProps = {
  icon?: React.ReactNode
  sx?: SxProps<Theme>
} & Pick<FabProps, 'color' | 'size' | 'variant'>

type CompareFabContentProps = CompareFabProps & {total_quantity: number}

const MotionDiv = styled(m.div)({})

const MotionFab = m(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.forwardRef<any, Omit<FabProps, 'style' | 'onDrag'>>((props, ref) => (
    <Fab {...props} ref={ref} />
  )),
)

const { classes } = extendableComponent('CompareFab', ['root', 'compare', 'shadow'] as const)

function CompareFabContent(props: CompareFabContentProps) {
  const { total_quantity, icon, sx = [], ...fabProps } = props

  const theme2 = useTheme()
  const scrollY = useScrollY()
  const opacity = useTransform(scrollY, [50, 60], [0, 1])

  const paper0 = alpha(theme2.palette.background.paper, 0)
  const paper1 = alpha(theme2.palette.background.paper, 1)
  const backgroundColor = useTransform(scrollY, [0, 10], [paper0, paper1])

  const compareIcon = icon ?? <IconSvg src={iconBox} size='large' />
  const fabIconSize = useFabSize('responsive')

  return (
    <Box
      className={classes.root}
      sx={[
        { position: 'relative', width: fabIconSize, height: fabIconSize },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <MotionFab
        href='/compare'
        className={classes.compare}
        aria-label={i18n._(/* i18n */ 'Compare')}
        color='inherit'
        size='responsive'
        style={{ backgroundColor }}
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            backgroundColor: `${theme.palette.background.paper} !important`,
          },
        })}
        {...fabProps}
      >
        <DesktopHeaderBadge
          color='primary'
          variant='standard'
          overlap='circular'
          badgeContent={total_quantity}
        >
          {compareIcon}
        </DesktopHeaderBadge>
      </MotionFab>

      <MotionDiv
        className={classes.shadow}
        sx={(theme) => ({
          pointerEvents: 'none',
          borderRadius: '99em',
          position: 'absolute',
          height: '100%',
          width: '100%',
          boxShadow: 6,
          top: 0,
          [theme.breakpoints.down('md')]: {
            opacity: '1 !important',
          },
        })}
        style={{ opacity }}
      />
    </Box>
  )
}

export function CompareFab(props: CompareFabProps) {
  const { data: curCompareId } = useQuery(CurrentCompareUidDocument)
  const compareList = useQuery(CompareListDocument, {
    variables: { uid: curCompareId?.currentCompareUid?.id ?? '' },
    fetchPolicy: 'cache-and-network',
  })

  return (
    <WaitForQueries waitFor={compareList} fallback={<Box>joe</Box>}>
      <CompareFabContent total_quantity={compareList.data?.compareList?.item_count ?? 0} {...props} />
    </WaitForQueries>
  )
}
