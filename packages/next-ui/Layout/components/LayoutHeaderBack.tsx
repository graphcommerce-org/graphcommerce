import {
  useUp,
  usePrevUp,
  usePageContext,
  usePrevPageRouter,
} from '@graphcommerce/framer-next-pages'
import { i18n } from '@lingui/core'
import { Box, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import { LinkOrButton, LinkOrButtonProps } from '../../Button/LinkOrButton'
import { IconSvg } from '../../IconSvg'
import { responsiveVal } from '../../Styles'
import { iconChevronLeft } from '../../icons'

export type BackProps = Omit<LinkOrButtonProps, 'onClick' | 'children'> & {
  preventClickBack?: boolean
}

export function useShowBack() {
  const path = useRouter().asPath.split('?')[0]
  const up = useUp()
  const prevUp = usePrevUp()
  const { backSteps } = usePageContext()

  const canClickBack = backSteps > 0 && path !== prevUp?.href
  return canClickBack || (up?.href && up.href !== path)
}

const buttonSx: SxProps<Theme> = (theme) => ({
  '&:not(.Mui-disabled)': { boxShadow: 6 },
  [theme.breakpoints.down('md')]: {
    minWidth: 'auto',
    paddingLeft: responsiveVal(8, 11),
    paddingRight: responsiveVal(8, 11),
    '& .MuiButton-startIcon': {
      marginRight: 0,
      marginLeft: 0,
    },
  },
})

export function LayoutHeaderBack(props: BackProps) {
  const { preventClickBack = false } = props
  const router = useRouter()
  const path = router.asPath.split('?')[0]
  const up = useUp()
  const prevUp = usePrevUp()
  const { backSteps } = usePageContext()
  const prevPageRouter = usePrevPageRouter()

  const backIcon = <IconSvg src={iconChevronLeft} size='medium' />
  const canClickBack = backSteps > 0 && path !== prevUp?.href && !preventClickBack

  let label = i18n._(/* i18n */ 'Back')
  if (up?.href === path && up?.title) label = up.title
  if (prevUp?.href === path && prevUp?.title) label = prevUp.title

  if (up && prevPageRouter?.asPath === up?.href) label = up.title

  if (canClickBack) {
    return (
      <LinkOrButton
        onClick={() => router.back()}
        button={{ variant: 'pill', sx: buttonSx }}
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
      <LinkOrButton
        href={up.href}
        button={{ variant: 'pill', sx: buttonSx }}
        startIcon={backIcon}
        aria-label={up.title}
        color='inherit'
        {...props}
      >
        <Box component='span' sx={{ display: { xs: 'none', md: 'inline' } }}>
          {up.title}
        </Box>
      </LinkOrButton>
    )

  return null
}
