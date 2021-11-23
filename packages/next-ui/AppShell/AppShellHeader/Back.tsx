import React from 'react'
import { iconChevronLeft } from '../..'
import Button, { ButtonProps } from '../../Button'
import PageLink from 'next/link'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'
import { usePageRouter, useUp, usePrevUp, usePageContext } from '@graphcommerce/framer-next-pages'
import { Trans } from '@lingui/macro'

export type BackProps = Omit<ButtonProps, 'onClick'>

export default function Back() {
  const router = usePageRouter()
  const up = useUp()
  const prevUp = usePrevUp()
  const { backSteps } = usePageContext()

  const backIcon = <SvgImageSimple src={iconChevronLeft} />
  const canClickBack = backSteps > 0 && router.asPath !== prevUp?.href

  if (canClickBack)
    return (
      <Button onClick={() => router.back()} variant='pill-link' startIcon={backIcon}>
        {up?.href === router.asPath ? up.title : <Trans>Back</Trans>}
      </Button>
    )

  if (up?.href)
    return (
      <PageLink href={up.href} passHref>
        <Button variant='pill-link' startIcon={backIcon}>
          {up.title}
        </Button>
      </PageLink>
    )

  return null
}
