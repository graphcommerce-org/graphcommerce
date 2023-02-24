import { themeBaseDefaults } from '../../Theme'
import { createResponsiveTemplate, FromTo } from '../spreadVal'

it('generates the right spreadVal', () => {
  const responsiveTemplate = createResponsiveTemplate(themeBaseDefaults.breakpoints.values)

  expect(responsiveTemplate`${[15, 18]}px`).toMatchInlineSnapshot(`
    [
      "15px",
      "15.09px",
      "15.48px",
      "16.73px",
      "18px",
    ]
  `)

  expect(responsiveTemplate`${[10, 20]}px`).toMatchInlineSnapshot(`
    [
      "10px",
      "10.31px",
      "11.6px",
      "15.78px",
      "20px",
    ]
  `)

  const xxs: FromTo = [10, 16]
  const md: FromTo = [16, 50]
  expect(responsiveTemplate`calc(100% - 96px - ${md}px * 2)`).toMatchInlineSnapshot(`
    [
      "calc(100% - 96px - 16px * 2)",
      "calc(100% - 96px - 17.04px * 2)",
      "calc(100% - 96px - 21.44px * 2)",
      "calc(100% - 96px - 35.64px * 2)",
      "calc(100% - 96px - 50px * 2)",
    ]
  `)

  // `${theme.spacings.xxs} ${theme.spacings.xxs} !important`,
  expect(responsiveTemplate`${xxs}px ${xxs}px !important`).toMatchInlineSnapshot(`
    [
      "10px 10px !important",
      "10.18px 10.18px !important",
      "10.96px 10.96px !important",
      "13.47px 13.47px !important",
      "16px 16px !important",
    ]
  `)

  const someValue = 100

  expect(responsiveTemplate`calc(${100}px - ${xxs}px) !important`).toMatchInlineSnapshot(`
    [
      "calc(100px - 10px) !important",
      "calc(100px - 10.18px) !important",
      "calc(100px - 10.96px) !important",
      "calc(100px - 13.47px) !important",
      "calc(100px - 16px) !important",
    ]
  `)

  expect(responsiveTemplate`calc(${someValue}px - ${xxs}px) !important`).toMatchInlineSnapshot(`
    [
      "calc(100px - 10px) !important",
      "calc(100px - 10.18px) !important",
      "calc(100px - 10.96px) !important",
      "calc(100px - 13.47px) !important",
      "calc(100px - 16px) !important",
    ]
  `)

  expect(responsiveTemplate`calc(${[10, 20]}px - ${[20, 40]}px) !important`).toMatchInlineSnapshot(`
    [
      "calc(10px - 20px) !important",
      "calc(10.31px - 20.61px) !important",
      "calc(11.6px - 23.2px) !important",
      "calc(15.78px - 31.55px) !important",
      "calc(20px - 40px) !important",
    ]
  `)

  const themeSpacingsXxs = responsiveTemplate`${[10, 20]}px`
  expect(responsiveTemplate`calc(${themeSpacingsXxs} * -1)`).toMatchInlineSnapshot(`
    [
      "calc(10px * -1)",
      "calc(10.31px * -1)",
      "calc(11.6px * -1)",
      "calc(15.78px * -1)",
      "calc(20px * -1)",
    ]
  `)

  const itemWidthSm = '70vw'
  expect(responsiveTemplate`calc(${itemWidthSm} - (16px * 2))`).toMatchInlineSnapshot(`
    [
      "calc(70vw - (16px * 2))undefined",
      "calc(70vw - (16px * 2))undefined",
      "calc(70vw - (16px * 2))undefined",
      "calc(70vw - (16px * 2))undefined",
      "calc(70vw - (16px * 2))undefined",
    ]
  `)
})
