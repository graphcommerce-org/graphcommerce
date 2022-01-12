import { useUp, usePrevUp, usePageContext } from '@graphcommerce/framer-next-pages'
import { usePrevPageRouter } from '@graphcommerce/framer-next-pages/hooks/usePrevPageRouter'
import { t } from '@lingui/macro'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { LinkOrButton, LinkOrButtonProps } from '../../Button/LinkOrButton'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'
import { iconChevronLeft } from '../../icons'

export type BackProps = Omit<LinkOrButtonProps, 'onClick' | 'children'>

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

  let label = t`Back`
  if (up?.href === prevRouter?.asPath && up?.title) label = up.title
  if (prevUp?.href === prevRouter?.asPath && prevUp?.title) label = prevUp.title

  if (canClickBack) {
    return (
      <LinkOrButton
        onClick={() => router.back()}
        button={{ variant: 'pill' }}
        color='inherit'
        startIcon={backIcon}
        aria-label={label}
        {...props}
      >
        {label}
      </LinkOrButton>
    )
  }

  if (up?.href && up.href !== router.asPath)
    return (
      <PageLink href={up.href} passHref>
        <LinkOrButton
          button={{ variant: 'pill' }}
          startIcon={backIcon}
          aria-label={up.title}
          color='inherit'
          {...props}
        >
          {up.title}
        </LinkOrButton>
      </PageLink>
    )

  return null
}
