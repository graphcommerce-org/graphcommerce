import { useForm, useFormAutoSubmit } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { LayoutOverlayHeader, LayoutTitle, responsiveVal } from '@graphcommerce/next-ui'
import {
  LayoutOverlayDemo,
  LayoutOverlayState,
  useLayoutState,
} from '@graphcommerce/next-ui/LayoutOverlay/test/LayoutOverlayDemo'
import { capitalize, Container, Hidden, ListItemButton, Typography } from '@mui/material'
import { m } from 'framer-motion'
import { useState } from 'react'

type Size = 'Sm' | 'Md'

const sizes: Size[] = ['Sm', 'Md']

function SheetDemo() {
  const [layout, setLayout] = useLayoutState()

  const form = useForm<LayoutOverlayState>({ defaultValues: layout, mode: 'onChange' })
  const { register } = form
  const [scroll, setScroll] = useState<boolean>(false)

  const { variantMd, variantSm, justifyMd, justifySm, sizeMd, sizeSm } = layout

  const submit = form.handleSubmit(setLayout)
  useFormAutoSubmit({ form, submit, wait: 0 })

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small'>
          <Hidden mdDown>
            Overlay Md {variantMd} {justifyMd} {sizeMd}
          </Hidden>
          <Hidden smUp>
            Overlay Sm {variantSm} {justifySm} {sizeSm}
          </Hidden>
        </LayoutTitle>
      </LayoutOverlayHeader>

      <LayoutTitle>
        <Hidden mdDown>
          Overlay Md {variantMd} {justifyMd} {sizeMd}
        </Hidden>
        <Hidden smUp>
          Overlay Sm {variantSm} {justifySm} {sizeSm}
        </Hidden>
      </LayoutTitle>
      <Container maxWidth={false} sx={{ minWidth: responsiveVal(250, 500) }}>
        <form style={{ paddingTop: '100px' }} onSubmit={submit}>
          {sizes.map((size) => (
            <div key={size}>
              <Typography variant='subtitle1'>{size}</Typography>

              <input type='text' value='should be selectable' readOnly />

              <div>
                Variant:
                {(['left', 'bottom', 'right'] as const).map((value) => {
                  const name: `variant${Size}` = `variant${size}`
                  const id = `${name}-${value}`
                  return (
                    <label key={id} htmlFor={id}>
                      <input {...register(name)} id={id} type='radio' value={value} />
                      {capitalize(value)}
                    </label>
                  )
                })}
              </div>

              <div>
                Size:
                {(['floating', 'minimal', 'full'] as const).map((value) => {
                  const name: `size${Size}` = `size${size}`
                  const id = `${name}-${value}`
                  return (
                    <label key={id} htmlFor={id}>
                      <input {...register(name)} id={id} type='radio' value={value} />
                      {capitalize(value)}
                    </label>
                  )
                })}
              </div>

              <div>
                Justify:
                {(['start', 'end', 'center', 'stretch'] as const).map((value) => {
                  const name: `justify${Size}` = `justify${size}`
                  const id = `${name}-${value}`
                  return (
                    <label key={id} htmlFor={id}>
                      <input {...register(name)} id={id} type='radio' value={value} />
                      {capitalize(value)}
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </form>

        <ListItemButton
          onClick={() => setScroll(!scroll)}
          color='secondary'
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          {scroll ? 'Make unscrollable' : 'Make scrollable'}
        </ListItemButton>
        <div>
          <m.div
            animate={{ height: scroll ? 2000 : 1 }}
            initial={false}
            transition={{ type: 'tween' }}
            style={{ width: '20px', background: '#dedede' }}
          />
        </div>
      </Container>
    </>
  )
}

const pageOptions: PageOptions = {
  overlayGroup: 'test',
  Layout: LayoutOverlayDemo,
}
SheetDemo.pageOptions = pageOptions
export default SheetDemo
