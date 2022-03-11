import { useUp, usePrevUp, usePageContext } from '@graphcommerce/framer-next-pages'
import { t } from '@lingui/macro'
import { Box } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { LinkOrButton, LinkOrButtonProps } from '../../Button/LinkOrButton'
import { IconSvg } from '../../IconSvg'
import { iconChevronLeft } from '../../icons'

export type BackProps = Omit<LinkOrButtonProps, 'onClick' | 'children'>

export function useShowBack() {
  const path = useRouter().asPath.split('?')[0]
  const up = useUp()
  const prevUp = usePrevUp()
  const { backSteps } = usePageContext()

  const canClickBack = backSteps > 0 && path !== prevUp?.href

  if (canClickBack) return true
  if (up?.href && up.href !== path) return true
  return false
}

export function LayoutHeaderBack(props: BackProps) {
  const router = useRouter()
  const path = router.asPath.split('?')[0]
  const up = useUp()
  const prevUp = usePrevUp()
  const { backSteps } = usePageContext()

  const backIcon = <IconSvg src={iconChevronLeft} size='medium' />
  const canClickBack = backSteps > 0 && path !== prevUp?.href

  let label = t`Back`
  if (up?.href === path && up?.title) label = up.title
  if (prevUp?.href === path && prevUp?.title) label = prevUp.title

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
        <Box component='span' sx={{ display: { xs: 'none', md: 'inline' } }}>
          {label}
        </Box>
      </LinkOrButton>
    )
  }

  if (up?.href && up.href !== path)
    return (
      <PageLink href={up.href} passHref>
        <LinkOrButton
          button={{ variant: 'pill' }}
          startIcon={backIcon}
          aria-label={up.title}
          color='inherit'
          {...props}
        >
          <Box component='span' sx={{ display: { xs: 'none', md: 'inline' } }}>
            {up.title}
          </Box>
        </LinkOrButton>
      </PageLink>
    )

  return null
}
