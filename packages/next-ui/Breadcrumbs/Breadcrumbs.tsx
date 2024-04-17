import { Trans } from '@lingui/react'
import {
  Breadcrumbs as BreadcrumbsBase,
  IconButton,
  Link,
  Typography,
  useTheme,
} from '@mui/material'
import dynamic from 'next/dynamic'
import { useRef, useState, MouseEvent } from 'react'
import { IconSvg } from '../IconSvg'
import { iconClose, iconEllypsis } from '../icons'
import { BreadcrumbsJsonLd } from './BreadcrumbsJsonLd'
import { jsonLdBreadcrumb } from './jsonLdBreadcrumb'
import type { BreadcrumbsType } from './types'

const BreadcrumbsPopper = dynamic(
  async () => (await import('./BreadcrumbsPopper')).BreadcrumbsPopper,
)

export function Breadcrumbs(props: BreadcrumbsType) {
  const { breadcrumbs, name, baseUrl, sx, breadcrumbsAmount = 2 } = props
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const theme = useTheme()

  const isDefault = breadcrumbsAmount === 0
  const showHome = isDefault || breadcrumbs.length < 2 || breadcrumbs.length - breadcrumbsAmount < 0
  const showButtonMobile = breadcrumbs.length > 1
  const showButtonDesktop = breadcrumbsAmount > 0 && breadcrumbs.length >= breadcrumbsAmount
  const showFirst = isDefault || breadcrumbs.length - breadcrumbsAmount <= 0
  const startIndex = showFirst ? 0 : breadcrumbs.length - breadcrumbsAmount

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(anchorElement ? null : e.currentTarget)
  }

  return (
    <>
      {breadcrumbs.length && (
        <BreadcrumbsJsonLd
          baseUrl={baseUrl}
          breadcrumbs={breadcrumbs}
          render={(bc, url) => ({
            '@context': 'https://schema.org',
            ...jsonLdBreadcrumb(bc, url),
          })}
        />
      )}
      <BreadcrumbsBase
        sx={[
          {
            overflowX: 'clip',
            '& .MuiBreadcrumbs-ol': {
              flexWrap: 'nowrap',
              '& .MuiBreadcrumbs-li': {
                '&:nth-of-type(1)': {
                  display: {
                    xs: showButtonMobile ? 'flex' : 'none',
                    md: showButtonDesktop ? 'flex' : 'none',
                  },
                },
                '&:nth-last-of-type(1)': {
                  display: 'inline-flex',
                  overflowX: 'hidden',
                },
              },
              '& .MuiBreadcrumbs-separator': {
                '&:nth-of-type(2)': {
                  display: {
                    xs: showButtonMobile ? 'flex' : 'none',
                    md: showButtonDesktop ? 'flex' : 'none',
                  },
                },
              },
            },

            [theme.breakpoints.down('md')]: {
              '& .MuiBreadcrumbs-li': {
                '&:not(:nth-last-of-type(-n+3))': {
                  display: 'none',
                },
              },
              '& .MuiBreadcrumbs-separator': {
                '&:not(:nth-last-of-type(-n+2))': {
                  display: 'none',
                },
              },
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <IconButton
          aria-describedby={anchorElement ? 'breadcrumb-list' : undefined}
          ref={anchorRef}
          color='default'
          onClick={handleClick}
          sx={{
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: 1,
            color: 'text.primary',
            px: 1.5,
            py: 0.7,
            typography: 'caption',
          }}
        >
          <IconSvg src={anchorElement ? iconClose : iconEllypsis} />
        </IconButton>
        {showHome && (
          <Link href='/' underline='hover' color='text.primary' variant='body1'>
            <Trans id='Home' />
          </Link>
        )}
        {breadcrumbs.slice(startIndex, breadcrumbs.length - 1).map((breadcrumb) => (
          <Link {...breadcrumb} underline='hover' color='text.primary' variant='body1' />
        ))}
        <Typography component='span' color='text.primary' variant='body1' fontWeight='600' noWrap>
          {name}
        </Typography>
      </BreadcrumbsBase>
      <BreadcrumbsPopper
        breadcrumbs={breadcrumbs}
        name={name}
        breadcrumbsAmount={breadcrumbsAmount}
        anchorElement={anchorElement}
        setAnchorElement={setAnchorElement}
        showButtonMobile={showButtonMobile}
      />
    </>
  )
}
