import { useUp, usePrevUp, usePageContext } from '@graphcommerce/framer-next-pages'
import { usePrevPageRouter } from '@graphcommerce/framer-next-pages/hooks/usePrevPageRouter'
import { t } from '@lingui/macro'
import { Button, ButtonProps } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'
import { iconChevronLeft } from '../../icons'

export type BackProps = Omit<ButtonProps, 'onClick' | 'children'>

export function useShowBack() {
  const router = useRouter()
  const up = useUp()
  const prevUp = usePrevUp()
  const { backSteps } = usePageContext()

  const canClickBack = backSteps > 0 && router.asPath !== prevUp?.href

  if (canClickBack) return true
  if (up?.href && up.href !== router.asPath) return true
  return false
}

export default function LayoutHeaderBack(props: BackProps) {
  const router = useRouter()
  const up = useUp()
  const prevRouter = usePrevPageRouter()
  const prevUp = usePrevUp()
  const { backSteps } = usePageContext()

  const backIcon = <SvgImageSimple src={iconChevronLeft} />
  const canClickBack = backSteps > 0 && router.asPath !== prevUp?.href

  if (canClickBack) {
    const label = up?.href === prevRouter?.asPath ? up?.title : t`Back`
    return (
      <Button
        onClick={() => router.back()}
        variant='pill-link'
        startIcon={backIcon}
        aria-label={label}
        {...props}
      >
        {label}
      </Button>
    )
  }

  if (up?.href && up.href !== router.asPath)
    return (
      <PageLink href={up.href} passHref>
        <Button variant='pill-link' startIcon={backIcon} aria-label={up.title} {...props}>
          {up.title}
        </Button>
      </PageLink>
    )

  return null
}
