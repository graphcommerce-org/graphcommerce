import { makeStyles, Theme } from '@material-ui/core'

type UseProductListStylesProps = { count: number }

const useProductListStyles = makeStyles(
  (theme: Theme) => ({
    productList: ({ count }: UseProductListStylesProps) => {
      let big = 3
      let index = 0
      let toggle = false
      let selector = ''
      for (index = 0; index <= count; index++) {
        if (index === big) {
          selector += `& >:nth-child(${big}),`
          if (toggle === false) {
            big = index + 7
            toggle = !toggle
          } else {
            big = index + 11
            toggle = !toggle
          }
        }
      }
      selector = selector.slice(0, -1)
      return {
        [theme.breakpoints.up('xl')]: {
          [`${selector}`]: {
            gridColumn: 'span 2',
            gridRow: 'span 2;',
            '& > a > div': {
              paddingTop: `calc(100% + ${theme.spacings.lg} - 2px)`,
            },
          },
        },
      }
    },
  }),
  { name: 'ProductList' },
)

export default useProductListStyles
