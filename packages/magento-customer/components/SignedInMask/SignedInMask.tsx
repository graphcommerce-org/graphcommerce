import { cssFlag, cssNotFlag } from '@graphcommerce/next-ui'
import { Box, Skeleton, SkeletonOwnProps, SkeletonProps, SxProps, Theme } from '@mui/material'
import type { OverrideProps } from '@mui/material/OverridableComponent'
import React, { createContext, useContext, useMemo } from 'react'

type MaskProp = { skeleton?: SkeletonProps }

interface SignedInMaskTypeMap<
  AdditionalProps = MaskProp,
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & SkeletonOwnProps
  defaultComponent: RootComponent
}

export type SignedInMaskProps<
  RootComponent extends React.ElementType = SignedInMaskTypeMap['defaultComponent'],
  AdditionalProps = MaskProp,
> = OverrideProps<SignedInMaskTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType
}

type SignedInMaskContextType = { mask: boolean }

const SignedInMaskContext = createContext<SignedInMaskContextType | null>(null)

export function useSignedInMask() {
  const context = useContext(SignedInMaskContext)
  if (!context) {
    console.warn('useSignedInMask was used without a SignedInMaskProvider')
    return { mask: false }
  }
  return context
}

export function SignedInMaskProvider(props: { mask: boolean; children: React.ReactNode }) {
  const { mask = false, children } = props
  return (
    <SignedInMaskContext.Provider value={useMemo(() => ({ mask }), [mask])}>
      {children}
    </SignedInMaskContext.Provider>
  )
}

export function useSignedInMaskSx(props: { sx?: SxProps<Theme>; skeleton?: SkeletonProps }) {
  const { sx = [], skeleton } = props
  const { mask } = useSignedInMask()

  return {
    mask,
    componentSx: [
      mask && {
        [cssFlag('signed-in')]: { display: 'none' },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ],
    maskSx: [
      {
        display: 'inline-block',
        [cssNotFlag('signed-in')]: { display: 'none' },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(skeleton?.sx) ? skeleton.sx : [skeleton?.sx]),
    ],
  }
}

export function SignedInMask(props: SignedInMaskProps) {
  const { skeleton, children, ...rest } = props
  const { mask, componentSx, maskSx } = useSignedInMaskSx(props)

  return (
    <>
      <Box {...rest} sx={componentSx}>
        {children}
      </Box>
      {mask && <Skeleton {...rest} {...skeleton} sx={maskSx} />}
    </>
  )
}
