import { SelectElement, useForm, useFormPersist, WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  useCompareListStyles,
  useCompareList,
  CompareRow,
  EmptyCompareListButton,
  MoreInformationRow,
  EmptyCompareList,
} from '@graphcommerce/magento-compare'
import { ProductListItems } from '@graphcommerce/magento-product' // todo move to prop @paul (wat/hoe?)
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  LayoutOverlay,
  LayoutOverlayProps,
  iconCompare,
  FullPageMessage,
  LayoutOverlayHeader,
  LayoutTitle,
  PageMeta,
} from '@graphcommerce/next-ui'

import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container, FormControl, NoSsr } from '@mui/material'
import { useRouter } from 'next/router'

import { useEffect, useRef } from 'react'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

export function ComparePage() {
  const compareList = useCompareList()
  const compareListData = compareList.data
  const compareListCount = compareListData?.compareList?.item_count ?? 0
  const gridColumns = compareListCount <= 3 ? compareListCount : 3
  const router = useRouter()

  const form = useForm<{ selected: number[] }>({
    defaultValues: { selected: [...Array(gridColumns).keys()] },
  })

  useFormPersist({ form, name: 'CompareList', storage: 'localStorage' })
  const selectedState = form.watch('selected')
  const selectedPrevious = useRef<number[]>(selectedState)
  const compareAbleItems = compareListData?.compareList?.items
  const compareListAttributes = compareListData?.compareList?.attributes
  const compareListStyles = useCompareListStyles(gridColumns)

  useEffect(() => {
    if (compareAbleItems?.length) {
      selectedPrevious.current = selectedState

      /*
       * It's possible that the user has 5 items in his comparelist, so [0,1,2,3,4] are all selectable indexes
       * If the user has a selected state of indexes [0,3,4] but then removes the 4th item, the currentCompareProducts[4] would be undefined and the UI would be corrupt
       * So we need to get the first index that isnt already in the selectedState array (as we cant have duplicates)
       */
      selectedState.forEach((selectedIndex, index) => {
        if (selectedIndex >= compareAbleItems.length) {
          const allIndexes = [...Array(compareAbleItems.length).keys()]
          const allowedIndexes = allIndexes.filter((el) => !selectedState.includes(el))
          form.setValue(`selected.${index}`, allowedIndexes[0])
        }
      })

      // if there are less items in the compare list than in our selectedState
      if (compareListCount < selectedState.length) {
        form.setValue(`selected`, [...Array(compareListCount).keys()])
      }

      // if there are less items in our selectedState than we have columns
      if (selectedState.length < gridColumns) {
        form.setValue(`selected`, [...Array(gridColumns).keys()])
      }
    }
  }, [selectedState, compareAbleItems, router, form, compareListCount, gridColumns])

  if (!compareAbleItems || compareAbleItems.length === 0) {
    return (
      <NoSsr>
        <EmptyCompareList />
      </NoSsr>
    )
  }

  const currentCompareItems = selectedState.map((i) => compareAbleItems[i])
  const currentCompareProducts = currentCompareItems.map((item) => item?.product)

  return (
    <NoSsr>
      <PageMeta title={i18n._(/* i18n */ 'Compare products')} metaRobots={['noindex']} />
      <LayoutOverlayHeader
        switchPoint={0}
        primary={
          compareList.data?.compareList?.uid && (
            <EmptyCompareListButton compareListUid={compareList.data.compareList.uid} />
          )
        }
        divider={<Box />}
      >
        <LayoutTitle size='small' component='span' icon={iconCompare}>
          <Trans id='Compare' /> ({compareListCount})
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Box>
        <WaitForQueries
          waitFor={compareList}
          fallback={
            <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
              <Trans id='This may take a second' />
            </FullPageMessage>
          }
        >
          <Container maxWidth={gridColumns === 3 ? 'xl' : 'lg'} disableGutters>
            <Box
              sx={(theme) => ({
                ...compareListStyles,
                px: { xs: theme.spacings.xs, md: theme.spacings.md, lg: theme.spacings.lg },
                py: theme.spacings.xxs,
                [theme.breakpoints.down('md')]: {
                  boxShadow: 2,
                },
                background: theme.palette.background.paper,
                position: 'sticky',
                zIndex: 10,
                top: {
                  xs: `calc(${theme.appShell.headerHeightSm} / 2)`,
                  lg: `calc(${theme.page.vertical} / 2)`,
                },
              })}
            >
              {[...Array(gridColumns).keys()].map((compareSelectIndex) => (
                <FormControl key={compareSelectIndex}>
                  <SelectElement
                    control={form.control}
                    name={`selected.${compareSelectIndex}`}
                    options={compareAbleItems.map((i, id) => ({
                      id,
                      label: i?.product?.name ?? '',
                    }))}
                    size='small'
                    onChange={(to) => {
                      const from = selectedPrevious.current?.[compareSelectIndex]
                      const found = selectedPrevious.current?.indexOf(Number(to))
                      if (found > -1) form.setValue(`selected.${found}`, from)
                    }}
                  />
                </FormControl>
              ))}
            </Box>

            <ProductListItems
              title='Compare items'
              items={currentCompareProducts}
              size='small'
              sx={(theme) => ({
                ...compareListStyles,
                padding: {
                  xs: theme.spacings.xs,
                  md: theme.spacings.md,
                  lg: theme.spacings.lg,
                },
                pt: 0,
              })}
            />
            <Box
              sx={(theme) => ({
                backgroundColor: theme.palette.background.default,
                py: theme.spacings.md,
                px: {
                  xs: theme.spacings.xs,
                  md: theme.spacings.md,
                  lg: theme.spacings.lg,
                },
                [theme.breakpoints.up('md')]: {
                  mb: theme.spacings.md,
                  borderRadius: theme.shape.borderRadius * 1.5,
                },
              })}
            >
              {compareListAttributes?.map((attribute) => (
                <CompareRow
                  compareAbleItems={currentCompareItems}
                  attribute={attribute}
                  key={attribute?.code}
                />
              ))}

              <MoreInformationRow compareAbleItems={currentCompareItems} />
            </Box>
          </Container>
        </WaitForQueries>
      </Box>
    </NoSsr>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'compare',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'bottom', variantSm: 'bottom' },
}
ComparePage.pageOptions = pageOptions

export default ComparePage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
