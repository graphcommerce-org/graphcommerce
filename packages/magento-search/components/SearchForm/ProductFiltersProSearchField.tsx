import { globalFormContextRef } from '@graphcommerce/magento-product'
import {
  Button,
  IconSvg,
  extendableComponent,
  iconClose,
  iconSearch,
  showPageLoadIndicator,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import {
  Fab,
  FabProps,
  FormControl,
  FormControlProps,
  IconButton,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'

type ProductFiltersProSearchFieldProps = FormControlProps & {
  fab?: FabProps
  input?: OutlinedInputProps
}

const name = 'ProductFiltersProSearchField' as const
const slotNames = ['root', 'input', 'fab'] as const
type StyleProps = { visible: boolean; searchPage: boolean }

const { withState } = extendableComponent<StyleProps, typeof name, typeof slotNames>(
  name,
  slotNames,
)

export function ProductFiltersProSearchField(props: ProductFiltersProSearchFieldProps) {
  const { input, fab, ...rest } = props

  const router = useRouter()

  const searchPage = router.asPath.startsWith('/search')
  const [expanded, setExpanded] = useState(searchPage)
  useMemo(() => setExpanded(searchPage), [searchPage])

  const queryUrl = router.query.url?.[0] ?? ''
  const searchTerm = searchPage && queryUrl !== 'q' ? queryUrl : ''

  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    // When the user is not focussed on the search field and the value gets update the form.
    if (ref.current && ref.current !== document.activeElement) ref.current.value = searchTerm
  }, [searchTerm])

  const visible = expanded || searchPage
  const classes = withState({ visible, searchPage })

  return (
    <>
      {visible && (
        <FormControl
          className={classes.root}
          variant='outlined'
          {...rest}
          sx={[
            (theme) => ({
              '&:not(.visible)': {
                opacity: 0,
                width: 'min-content',
              },
              '&.visible': {
                opacity: 1,
                width: '400px',
              },
            }),
            ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
          ]}
        >
          <OutlinedInput
            fullWidth
            type='text'
            name='search'
            color='primary'
            className={classes.input}
            // autoFocus={searchPage}
            onChange={(e) => {
              const context = globalFormContextRef.current

              // When we're not on the search page, we want to navigate as soon as possible.
              // We only want to navigate once, and let the rest be handled by the search page.
              if (!context || !searchPage) {
                return router.push(`/search/${e.target.value}`)
              }

              context.form.setValue('currentPage', 1)
              context.form.setValue('search', e.target.value)
              return context.submit()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const context = globalFormContextRef.current
                if (!context) return undefined
                context.form.setValue('currentPage', 1)
                context.form.setValue('search', e.currentTarget.value)
                return context.submit()
              }
            }}
            placeholder={t`Search...`}
            {...input}
            onBlur={() => {
              if (!searchPage && !showPageLoadIndicator.get()) setExpanded(false)
            }}
            endAdornment={
              <>
                <IconButton
                  color='inherit'
                  size='small'
                  onClick={() => {
                    const context = globalFormContextRef.current

                    if (context?.form.getValues('search')) {
                      context.form.setValue('currentPage', 1)
                      context.form.setValue('search', '')
                      context.submit()
                    } else {
                      setExpanded(false)
                      if (searchPage) router.back()
                    }
                  }}
                >
                  <IconSvg src={iconClose} size='large' />
                </IconButton>
              </>
            }
            inputRef={ref}
          />
        </FormControl>
      )}
      <Fab
        className={classes.fab}
        onClick={() => {
          setExpanded(true)
          ref.current?.focus()
        }}
        color='inherit'
        size='large'
        {...fab}
        sx={[
          {
            display: {
              xs: visible ? 'none' : 'inline-flex',
              // lg: 'none',
            },
          },
          ...(Array.isArray(fab?.sx) ? fab.sx : [fab?.sx]),
        ]}
      >
        <IconSvg src={iconSearch} size='large' />
      </Fab>
    </>
  )
}
