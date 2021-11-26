import { usePageRouter, useUp, usePrevUp, usePageContext } from '@graphcommerce/framer-next-pages'
import { Trans } from '@lingui/macro'
import PageLink from 'next/link'
import React from 'react'
import { iconChevronLeft } from '../..'
import Button, { ButtonProps } from '../../Button'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'

export type BackProps = Omit<ButtonProps, 'onClick' | 'children'>

export function useShowBack() {
  const router = usePageRouter()
  const up = useUp()
  const prevUp = usePrevUp()
  const { backSteps } = usePageContext()

  const canClickBack = backSteps > 0 && router.asPath !== prevUp?.href

  if (canClickBack) return true
  if (up?.href && up.href !== router.asPath) return true
  return false
}

export default function Back(props: BackProps) {
  const router = usePageRouter()
  const up = useUp()
  const prevUp = usePrevUp()
  const { backSteps } = usePageContext()

  const backIcon = <SvgImageSimple src={iconChevronLeft} />
  const canClickBack = backSteps > 0 && router.asPath !== prevUp?.href

  if (canClickBack)
    return (
      <Button onClick={() => router.back()} variant='pill-link' startIcon={backIcon} {...props}>
        {up?.href === router.asPath ? up.title : <Trans>Back</Trans>}
      </Button>
    )

  if (up?.href && up.href !== router.asPath)
    return (
      <PageLink href={up.href} passHref>
        <Button variant='pill-link' startIcon={backIcon} {...props}>
          {up.title}
        </Button>
      </PageLink>
    )

  return null
}
