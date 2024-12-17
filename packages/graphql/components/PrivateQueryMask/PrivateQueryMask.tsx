/* eslint-disable import/no-extraneous-dependencies */
import { cssFlag, cssNotFlag, useIsSSR } from '@graphcommerce/next-ui'
import type { SkeletonOwnProps, SkeletonProps, SxProps, Theme } from '@mui/material'
import { Box, Skeleton } from '@mui/material'
import type { OverrideProps } from '@mui/material/OverridableComponent'
import React, { createContext, useContext, useMemo } from 'react'

type MaskProp = { skeleton?: SkeletonProps }

interface PrivateQueryMaskTypeMap<
  AdditionalProps = MaskProp,
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & SkeletonOwnProps
  defaultComponent: RootComponent
}

export type PrivateQueryMaskProps<
  RootComponent extends React.ElementType = PrivateQueryMaskTypeMap['defaultComponent'],
  AdditionalProps = MaskProp,
> = OverrideProps<PrivateQueryMaskTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType
}

type PrivateQueryMaskContextType = { mask: boolean }

export const PrivateQueryMaskContext = createContext<PrivateQueryMaskContextType | undefined>(
  undefined,
)

export function usePrivateQueryMask(): PrivateQueryMaskContextType {
  const context = useContext(PrivateQueryMaskContext)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isSSR = process.env.NODE_ENV === 'development' ? useIsSSR() : false

  if (!context) {
    if (isSSR)
      console.warn(
        "usePrivateQueryMask was used without a PrivateQueryMaskProvider, this means that customer specific pricing probably isn't working.",
      )

    return { mask: false }
  }
  return context
}

export function PrivateQueryMaskProvider(props: { mask: boolean; children: React.ReactNode }) {
  const { mask = false, children } = props
  return (
    <PrivateQueryMaskContext.Provider value={useMemo(() => ({ mask }), [mask])}>
      {children}
    </PrivateQueryMaskContext.Provider>
  )
}

export function usePrivateQueryMaskSx(props: { sx?: SxProps<Theme>; skeleton?: SkeletonProps }) {
  const { sx = [], skeleton } = props
  const { mask } = usePrivateQueryMask()

  return {
    mask,
    componentSx: [
      mask && {
        [cssFlag('private-query')]: { display: 'none' },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ],
    maskSx: [
      {
        display: 'inline-block',
        [cssNotFlag('private-query')]: { display: 'none' },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(skeleton?.sx) ? skeleton.sx : [skeleton?.sx]),
    ],
  }
}

/** A component that renders a skeleton mask when the user is signed in. */
export function PrivateQueryMask(props: PrivateQueryMaskProps) {
  const { skeleton, children, ...rest } = props
  const { mask, componentSx, maskSx } = usePrivateQueryMaskSx(props)

  return (
    <>
      <Box {...rest} sx={componentSx}>
        {children}
      </Box>
      {mask && <Skeleton {...rest} {...skeleton} sx={maskSx} />}
    </>
  )
}
