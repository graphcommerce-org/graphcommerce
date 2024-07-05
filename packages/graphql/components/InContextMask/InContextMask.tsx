import { cssFlag, cssNotFlag } from '@graphcommerce/next-ui'
import { Box, Skeleton, SkeletonOwnProps, SkeletonProps, SxProps, Theme } from '@mui/material'
import type { OverrideProps } from '@mui/material/OverridableComponent'
import React, { createContext, useContext, useMemo } from 'react'

type MaskProp = { skeleton?: SkeletonProps }

interface InContextMaskTypeMap<
  AdditionalProps = MaskProp,
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & SkeletonOwnProps
  defaultComponent: RootComponent
}

export type InContextMaskProps<
  RootComponent extends React.ElementType = InContextMaskTypeMap['defaultComponent'],
  AdditionalProps = MaskProp,
> = OverrideProps<InContextMaskTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType
}

type InContextMaskContextType = { mask: boolean }

const InContextMaskContext = createContext<InContextMaskContextType | null>(null)

export function useInContextInputMask() {
  const context = useContext(InContextMaskContext)
  if (!context) {
    console.warn(
      "useInContextInputMask was used without a InContextMaskProvider, this means that customer specific pricing probably isn't working.",
    )
    return { mask: false }
  }
  return context
}

export function InContextMaskProvider(props: { mask: boolean; children: React.ReactNode }) {
  const { mask = false, children } = props
  return (
    <InContextMaskContext.Provider value={useMemo(() => ({ mask }), [mask])}>
      {children}
    </InContextMaskContext.Provider>
  )
}

export function useInContextInputMaskSx(props: { sx?: SxProps<Theme>; skeleton?: SkeletonProps }) {
  const { sx = [], skeleton } = props
  const { mask } = useInContextInputMask()

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

/**
 * A component that renders a skeleton mask when the user is signed in.
 */
export function InContextMask(props: InContextMaskProps) {
  const { skeleton, children, ...rest } = props
  const { mask, componentSx, maskSx } = useInContextInputMaskSx(props)

  return (
    <>
      <Box {...rest} sx={componentSx}>
        {children}
      </Box>
      {mask && <Skeleton {...rest} {...skeleton} sx={maskSx} />}
    </>
  )
}
