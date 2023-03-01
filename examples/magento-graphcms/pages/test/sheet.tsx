import { useForm, useFormAutoSubmit } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import {
  LayoutOverlayDemo,
  LayoutOverlayState,
  useLayoutState,
} from '@graphcommerce/next-ui/LayoutOverlay/test/LayoutOverlayDemo'
import { capitalize, Container, Hidden, Typography } from '@mui/material'

type Size = 'Sm' | 'Md'

const sizes: Size[] = ['Sm', 'Md']

function SheetDemo() {
  const [layout, setLayout] = useLayoutState()

  const form = useForm<LayoutOverlayState>({ defaultValues: layout, mode: 'onChange' })
  const { register } = form
  const { variantMd, variantSm, justifyMd, justifySm, sizeMd, sizeSm } = layout

  const submit = form.handleSubmit(setLayout)
  useFormAutoSubmit({ form, submit, wait: 0 })

  return (
    <>
      <LayoutOverlayHeader switchPoint={0}>
        <LayoutTitle size='small'>
          <Hidden mdDown>
            Overlay Md {variantMd} {justifyMd} {sizeMd}
          </Hidden>
          <Hidden smUp>
            Overlay Sm {variantSm} {justifySm} {sizeSm}
          </Hidden>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth={false} sx={(theme) => ({ minWidth: theme.rv`${[250, 500]}px` })}>
        <form style={{ paddingTop: '100px' }} onSubmit={submit}>
          {sizes.map((size) => (
            <div key={size}>
              <Typography variant='subtitle1'>{size}</Typography>

              <input type='text' value='should be selectable' />

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
