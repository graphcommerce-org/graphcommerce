import { Container, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RichText from '@reachdigital/graphcms-ui/RichText'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import Asset from '../Asset'
import ProductListItems, { ProductListItemsProps } from '../ProductListItems/ProductListItems'
import { RowProductBackstoryFragment } from './RowProductBackstory.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: `${theme.spacings.md}`,
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '8fr 3fr',
      },
    },
    backstory: {
      position: 'relative',
      '& img': {
        position: 'absolute',
        top: '0',
        zIndex: -1,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'brightness(80%)',
        [theme.breakpoints.up('md')]: {
          filter: 'brightness(100%)',
          height: '100%',
        },
      },
    },
    copy: {
      color: '#fff',
      display: 'grid',
      justifyItems: 'start',
      alignContent: 'end',
      padding: `${theme.spacings.md}`,
      '& > *': {
        maxWidth: 'max-content',
      },
      [theme.breakpoints.up('md')]: {
        background: 'none',
        width: '60%',
        minHeight: '100vh',
      },
      [theme.breakpoints.up('lg')]: {
        padding: `${theme.spacings.lg} ${theme.spacings.lg}`,
        width: '50%',
      },
    },
    product: {
      maxWidth: '100%',
    },
  }),
  { name: 'RowProductBackstory' },
)

const useRichTextOne = makeStyles((theme: Theme) => ({
  paragraph: {
    textTransform: 'uppercase',
    maxWidth: '100%',
    fontWeight: 600,
    textAlign: 'left',
    fontSize: responsiveVal(11, 20),
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
      fontSize: responsiveVal(16, 34),
    },
    '& strong': {
      color: 'transparent',
      WebkitTextStroke: '1.2px #fff',
    },
  },
}))

type RowProductBackstoryProps = RowProductBackstoryFragment & ProductListItemsProps

export default function RowProductBackstory(props: RowProductBackstoryProps) {
  const { copy, asset, ...productListItems } = props
  const classes = useStyles()
  const richTextOneClasses = useRichTextOne(props)
  let singleItem = productListItems

  if (productListItems.items) {
    singleItem = {
      ...productListItems,
      items: [productListItems?.items[productListItems.items?.length - 1]],
    }
  }

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.backstory}>
          <div className={classes.copy}>
            <RichText classes={richTextOneClasses} {...copy} />
          </div>
          <Asset asset={asset} width={328} />
        </div>
        <div>
          <ProductListItems {...singleItem} />
        </div>
      </div>
    </Container>
  )
}
