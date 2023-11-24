import { Box, Typography } from '@mui/material'
import { productListPrice } from '../ProductListPrice'

export type ProductListItemTitleAndPriceProps = {
  titleComponent?: React.ElementType
  title: React.ReactNode
  subTitle?: React.ReactNode
  children: React.ReactNode
  classes: { titleContainer: string; title: string; subtitle: string }
}

export function ProductListItemTitleAndPrice(props: ProductListItemTitleAndPriceProps) {
  const { titleComponent = 'h2', classes, children, subTitle, title } = props

  return (
    <Box
      className={classes.titleContainer}
      sx={(theme) => ({
        display: 'grid',
        alignItems: 'baseline',
        marginTop: theme.spacings.xs,
        columnGap: 1,
        gridTemplateAreas: {
          xs: `"title title" "subtitle price"`,
          md: `"title subtitle price"`,
        },
        gridTemplateColumns: { xs: 'unset', md: 'auto auto 1fr' },
        justifyContent: 'space-between',
      })}
    >
      <Typography
        component={titleComponent}
        variant='subtitle1'
        sx={{
          display: 'inline',
          color: 'text.primary',
          overflowWrap: 'break-word',
          wordBreak: 'break-all',
          maxWidth: '100%',
          gridArea: 'title',
          fontWeight: 'fontWeightBold',
        }}
        className={classes.title}
      >
        {title}
      </Typography>

      {subTitle && (
        <Box sx={{ gridArea: 'subtitle' }} className={classes.subtitle}>
          {subTitle}
        </Box>
      )}

      <Typography
        component='div'
        variant='body1'
        className={productListPrice.classes.root}
        sx={{ gridArea: 'price', textAlign: 'right', justifySelf: { sm: 'flex-end' } }}
      >
        {children}
      </Typography>
    </Box>
  )
}
