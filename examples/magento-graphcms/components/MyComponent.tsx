/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-arrow-callback */

'use client'

import { PolymorphicComponent, PolymorphicProps, SlotComponentProps, useSlotProps } from '@mui/base'
import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
  unstable_composeClasses as composeClasses,
} from '@mui/utils'
import {} from '@mui/base/generateUtilityClasses'
import React, { forwardRef, useState } from 'react'

interface MyComponentClasses {
  /** Class name applied to the root element. */
  root: string
  /** State class applied to the root `button` element if `active={true}`. */
  active: string
  /** State class applied to the root `button` element if `disabled={true}`. */
  disabled: string
}

interface MyComponentOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MyComponentClasses>

  disabled?: boolean
  children?: React.ReactNode
  className?: string
  slotProps?: {
    root?: SlotComponentProps<'div', {}, RootSlotOwnerState>
  }
  slots?: {
    root?: React.ElementType
  }
}

type RootSlotOwnerState = MyComponentOwnProps & { active: boolean }

type MyComponentProps<C extends React.ElementType = MyComponentTypeMap['defaultComponent']> =
  PolymorphicProps<MyComponentTypeMap<{}, C>, C>

interface MyComponentTypeMap<AdditionalProps = {}, C extends React.ElementType = 'div'> {
  props: MyComponentOwnProps & AdditionalProps
  defaultComponent: C
}

const COMPONENT_NAME = 'MyButton'

const useUtilityClasses = ({ active, disabled, classes }: RootSlotOwnerState) =>
  composeClasses(
    { root: ['root', disabled && 'disabled', active && 'active'] },
    (slot) => generateUtilityClass(COMPONENT_NAME, slot),
    classes,
  )

export const MyComponent = forwardRef(
  <C extends React.ElementType>(props: MyComponentProps<C>, ref: React.ForwardedRef<Element>) => {
    const {
      children,
      classes,
      disabled,
      slotProps = {},
      slots = {},
      ...externalForwardedProps
    } = props

    const [active, setActive] = useState(false)
    const ownerState: RootSlotOwnerState = { ...props, active }

    const utilityClasses = useUtilityClasses(ownerState)

    const Root = slots.root ?? 'div'
    const rootProps = useSlotProps({
      elementType: Root,
      externalForwardedProps,
      getSlotProps: (other) => ({
        ...other,
        onClick: () => setActive(!active),
      }),
      externalSlotProps: slotProps.root,
      additionalProps: { ref },
      ownerState,
      className: utilityClasses.root,
    })

    return <Root {...rootProps}>{children}</Root>
  },
) as PolymorphicComponent<MyComponentTypeMap>

export function Test() {
  return (
    <MyComponent
      slots={{ root: 'a' }}
      slotProps={{ root: ({ active }) => ({ title: active ? 'testActive' : 'testInactive' }) }}
      className='trallaal'
      classes={{ root: 'jaja', active: 'onlyWhenActive' }}
      sx={{ bgcolor: 'red' }}
    >
      Hallo!
    </MyComponent>
  )
}

// Optional additional utility to get the classes to be used in query selectors.
export const buttonClasses: MyComponentClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'active',
  'disabled',
])
