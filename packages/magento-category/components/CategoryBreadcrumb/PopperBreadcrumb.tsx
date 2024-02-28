import { ProductPageBreadcrumbFragment } from '@graphcommerce/magento-product'
import { IconSvg, filterNonNullableKeys, iconClose, iconEllypsis } from '@graphcommerce/next-ui'
import {
  Breadcrumbs,
  Box,
  Chip,
  Link,
  Popper,
  Typography,
  useTheme,
  Fade,
  BreadcrumbsProps,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material'
import { useState, MouseEvent, useRef, SyntheticEvent } from 'react'
import { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'

type CategoryBreadcrumbProps = CategoryBreadcrumbFragment
type ProductBreadcrumbProps = NonNullable<
  NonNullable<ProductPageBreadcrumbFragment['categories']>[0]
>
export type PopperBreadcrumbProps = (CategoryBreadcrumbProps | ProductBreadcrumbProps) &
  Omit<BreadcrumbsProps, 'children'> & { numOfBreadcrumbsToShow?: number }

export function PopperBreadcrumb(props: PopperBreadcrumbProps) {
  const { breadcrumbs, sx, numOfBreadcrumbsToShow = 2, ...breadcrumbsProps } = props
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const theme = useTheme()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(anchorElement ? null : e.currentTarget)
  }

  const handleClickAway = (event: Event | SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLDivElement)) {
      return
    }

    setAnchorElement(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setAnchorElement(null)
    }
  }

  if (!breadcrumbs) return null

  const currentCategoryName = breadcrumbs[breadcrumbs.length - 1]?.category_name

  return (
    <>
      <Breadcrumbs
        {...breadcrumbsProps}
        sx={{
          overflowX: 'clip',
          '& .MuiBreadcrumbs-ol': {
            flexWrap: 'nowrap',
            '& .MuiBreadcrumbs-li': {
              '&:nth-of-type(1)': {
                display: breadcrumbs.length <= numOfBreadcrumbsToShow ? 'none' : 'flex',
              },
              '&:nth-last-of-type(1)': {
                display: 'inline-flex',
                overflowX: 'hidden',
              },
            },
            '& .MuiBreadcrumbs-separator': {
              '&:nth-of-type(2)': {
                display: breadcrumbs.length <= numOfBreadcrumbsToShow ? 'none' : 'flex',
              },
            },
          },
        }}
      >
        <Chip
          ref={anchorRef}
          component='button'
          variant='outlined'
          color='default'
          label={<IconSvg src={anchorElement ? iconClose : iconEllypsis} />}
          onClick={handleClick}
          sx={{
            borderRadius: 2,
            padding: 0,
            display: numOfBreadcrumbsToShow ? 'flex' : 'none',
            '& .MuiChip-label': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        />
        {filterNonNullableKeys(breadcrumbs, ['category_level'])
          .slice(
            breadcrumbs.length - numOfBreadcrumbsToShow < 0
              ? 0
              : breadcrumbs.length - numOfBreadcrumbsToShow,
            breadcrumbs.length - 1,
          )
          .sort((a, b) => a.category_level - b.category_level)
          .map((breadcrumb) => (
            <Link
              key={breadcrumb.category_uid}
              underline='hover'
              color='text.primary'
              href={`/${breadcrumb.category_url_path}`}
              variant='body1'
            >
              {breadcrumb.category_name}
            </Link>
          ))}
        <Typography component='span' color='text.primary' variant='body1' fontWeight='600' noWrap>
          {currentCategoryName}
        </Typography>
      </Breadcrumbs>
      <Popper
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        disablePortal
        placement='bottom-start'
        transition
        modifiers={[
          { name: 'offset', options: { offset: [0, 10] } },
          {
            name: 'preventOverflow',
            enabled: true,
            options: { altBoundary: false, padding: 10 },
          },
        ]}
        sx={{
          maxWidth: `calc(100% - ${theme.page.horizontal} * 2)`,
          display: {
            xs: breadcrumbs.length > 2 ? 'block' : 'none',
            md: breadcrumbs.length > numOfBreadcrumbsToShow ? 'block' : 'none',
          },
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
              <ClickAwayListener onClickAway={handleClickAway}>
                <MenuList
                  autoFocusItem={Boolean(anchorElement)}
                  onKeyDown={handleKeyDown}
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden auto',
                    py: `calc(${theme.spacings.xxs} / 2)`,
                  }}
                >
                  {filterNonNullableKeys(breadcrumbs, ['category_level'])
                    .slice(0, breadcrumbs.length - 1)
                    .sort((a, b) => a.category_level - b.category_level)
                    .map((breadcrumb) => (
                      <MenuItem
                        key={breadcrumb.category_uid}
                        sx={{
                          minHeight: 'auto',
                          padding: 0,
                        }}
                      >
                        <Link
                          underline='none'
                          color='text.primary'
                          href={`/${breadcrumb.category_url_path}`}
                          variant='body1'
                          noWrap
                          sx={{
                            flex: 1,
                            padding: `calc(${theme.spacings.xxs} / 2) ${theme.spacings.xs}`,
                          }}
                        >
                          {breadcrumb.category_name}
                        </Link>
                      </MenuItem>
                    ))}

                  <Typography
                    component='li'
                    color='text.primary'
                    variant='body1'
                    fontWeight='600'
                    noWrap
                    sx={{
                      padding: `calc(${theme.spacings.xxs} / 2) ${theme.spacings.xs}`,
                    }}
                  >
                    {currentCategoryName}
                  </Typography>
                </MenuList>
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  )
}
