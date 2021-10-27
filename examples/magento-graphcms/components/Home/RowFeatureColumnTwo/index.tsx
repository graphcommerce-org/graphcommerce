import { SvgImage, responsiveVal } from '@graphcommerce/next-ui'
import { Box, Button, Container, makeStyles, Tab, Theme, Typography } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import Link from 'next/link'
import React from 'react'
import {
  iconLogoFormium,
  iconLogoAdobe,
  iconLogoGraphcms,
  iconLogoMagento,
} from '../../Theme/icons/icons'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
    container: {
      padding: `${responsiveVal(50, 200)} 0`,
      display: 'grid',
      gridTemplateAreas: `
      "copy"
      "graphic"
      "services"
    `,
      gridTemplateColumns: '80%',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        gridTemplateAreas: `
      "copy graphic"
      "services services"
    `,
        gridTemplateColumns: 'minmax(400px, 650px) minmax(200px, 650px)',
        justifyContent: 'space-between',
      },
      columnGap: theme.spacings.md,
      rowGap: responsiveVal(20, 120),
    },
    copy: {
      gridArea: 'copy',
    },
    services: {
      gridArea: 'services',
      display: 'grid',
      justifyContent: 'center',
      '& > div': {
        margin: `${responsiveVal(10, 20)} 0`,
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: 30,
        justifyItems: 'center',
      },
    },
    styledButton: {
      marginTop: responsiveVal(20, 30),
      '& > span': {
        ...theme.typography.overline,
        textTransform: 'none',
        margin: '0 !important',
      },
    },
    query: {
      // color: theme.palette.primar.main,
      width: '100%',
      aspectRatio: '5/4',
      background: '#021F34',
      gridArea: 'graphic',
      justifySelf: 'end',
      borderRadius: 10,
      margin: `0`,
    },
    box: {
      height: '100%',
    },
    panel: {
      height: 'calc(100% - 48px)',
      overflowY: 'scroll',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        width: 7,
        height: 7,
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'none',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ffffff40',
        borderRadius: '1em',
        outline: 'none',
      },
      '& .hl-products, .hl-items, .hl-url_key, .hl-pages, .hl-title': {
        color: '#ACE7A1',
      },
      '& .hl-query, .hl-data, .hl-3': {
        // color: '#999999',
      },
    },
    label: {
      background: 'none',
      paddingLeft: responsiveVal(2, 8),
      paddingRight: responsiveVal(2, 8),
      '& > span:first-of-type': {
        padding: `${responsiveVal(2, 4)} ${responsiveVal(8, 2)}`,
        background: '#ffffff20',
        borderRadius: 6,
      },
      '& > span:last-of-type': {
        display: 'none',
      },
    },
    scrollert: {
      '& > div > span': {
        display: 'none',
      },
    },
  }),
  { name: 'RowFeatureColumnTwo' },
)

export default function RowFeatureColumnTwo() {
  const classes = useStyles()

  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const query = `query {
  products(search: "sock", pageSize: 3) {
    items {
      url_key
      }
  }
  pages(last: 3) {
    title
  }
}`

  const result = `{
  "data": {
    "products": {
      "items": [
        {
          "url_key": "giftcard-bundle-gc-29"
        },
        {
          "url_key": "giftcard-bundle-gc-190"
        },
        {
          "url_key": "giftcard-bundle-gc-444"
        }
      ]
    },
    "pages": [
      {
        "title": "Collaboration"
      },
      {
        "title": "Preview"
      },
      {
        "title": "Tips & tricks"
      }
    ]
  }
}`

  const styleCode = (snippet) => {
    const words = ['products', 'items', 'url_key', 'pages', 'title', 'query', 'data', '3']
    const regexp = new RegExp('(' + words.join('|') + ')', 'ig')
    return snippet.replace(regexp, '<span class="hl-$&">$&</span>')
  }

  return (
    <Container maxWidth={false} className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.copy}>
          <Typography variant='overline' component='div' gutterBottom color='primary'>
            Compose your backend
          </Typography>
          <Typography variant='h2' gutterBottom>
            Infinite services in a single endpoint
          </Typography>
          <Typography paragraph variant='h5' color='textSecondary'>
            At the heart of GraphCommerce® is our GraphQL Mesh, which consolidates data from
            different services. To date, Magento Open Source, Adobe Commerce, GraphCMS (rich
            content) and Formium (form creation) have been fully integrated.
          </Typography>
          <Link href='https://graphcommerce.vercel.app/api/graphql' passHref>
            <Button variant='text' size='large' className={classes.styledButton}>
              Explore GraphQL Mesh →
            </Button>
          </Link>
        </div>

        <div className={classes.query}>
          <Box className={classes.box}>
            <TabContext value={value}>
              <Box>
                <TabList
                  onChange={handleChange}
                  aria-label='lab API tabs example'
                  className={classes.scrollert}
                >
                  <Tab label='Query' value='1' className={classes.label} />
                  <Tab label='Result' value='2' className={classes.label} />
                </TabList>
              </Box>
              <TabPanel value='1' className={classes.panel}>
                <pre dangerouslySetInnerHTML={{ __html: styleCode(query) }}></pre>
              </TabPanel>
              <TabPanel value='2' className={classes.panel}>
                <pre dangerouslySetInnerHTML={{ __html: styleCode(result) }}></pre>
              </TabPanel>
            </TabContext>
          </Box>
        </div>

        <div className={classes.services}>
          <Typography paragraph variant='h5'>
            Integrated services that can be queried with a single call
          </Typography>
          <div>
            <SvgImage src={iconLogoMagento} alt='box' loading='eager' size='large' />
            <SvgImage src={iconLogoAdobe} alt='box' loading='eager' size='large' />
            <SvgImage src={iconLogoGraphcms} alt='box' loading='eager' size='large' />
            <SvgImage src={iconLogoFormium} alt='box' loading='eager' size='large' />
          </div>
        </div>
      </Container>
    </Container>
  )
}
