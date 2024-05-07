import { usePageContext, usePrevUp } from '@graphcommerce/framer-next-pages'
import { IconSvg, LinkOrButton, iconChevronLeft, responsiveVal } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'

export function ReturnToCartButton() {
  const router = useRouter()

  const path = router.asPath.split('?')[0]
  const prevUp = usePrevUp()
  const { backSteps } = usePageContext()

  const canClickBack = backSteps > 0 && path !== prevUp?.href

  const backIcon = <IconSvg src={iconChevronLeft} size='medium' />
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

  return (
    <LinkOrButton
      onClick={() => (canClickBack ? router.back() : router.replace('/cart'))}
      button={{ variant: 'inline', sx: buttonSx }}
      startIcon={backIcon}
      color='inherit'
    >
      <Box component='span' sx={{ display: { xs: 'none', md: 'inline' } }}>
        <Trans id='Back' />
      </Box>
    </LinkOrButton>
  )
}
