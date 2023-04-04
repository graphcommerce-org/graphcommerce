import { SelectElement, useForm, useFormPersist, WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  useCompareListStyles,
  useCompareList,
  CompareRow,
  EmptyCompareListButton,
  MoreInformationRow,
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
import { Box, CircularProgress, Container, FormControl } from '@mui/material'
import { useEffect, useRef } from 'react'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

export function ComparePage() {
  const compareList = useCompareList()
  const compareListData = compareList.data
  const compareListCount = compareListData?.compareList?.item_count ?? 0
  const gridColumns = compareListCount <= 3 ? compareListCount : 3

  const form = useForm<{ selected: number[] }>({
    defaultValues: { selected: [...Array(gridColumns).keys()] },
  })

  useFormPersist({ form, name: 'CompareList', storage: 'localStorage' })
  const selectedState = form.watch('selected')
  const selectedPrevious = useRef<number[]>(selectedState)
  useEffect(() => {
    selectedPrevious.current = selectedState
  }, [selectedState])

  const compareAbleItems = compareListData?.compareList?.items
  const compareListAttributes = compareListData?.compareList?.attributes
  const compareListStyles = useCompareListStyles(gridColumns)

  if (!compareAbleItems) return null

  const currentCompareItems = selectedState.map((i) => compareAbleItems[i])
  const currentCompareProducts = currentCompareItems.map((item) => item?.product)

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Compare products')} metaRobots={['noindex']} />
      <LayoutOverlayHeader
        switchPoint={0}
        primary={
          compareList.data?.compareList?.uid && (
            <EmptyCompareListButton compareListUid={compareList.data.compareList.uid} />
          )
        }
      >
        <LayoutTitle size='small' component='span' icon={iconCompare}>
          <Trans id='Compare' /> ({compareListCount})
        </LayoutTitle>
      </LayoutOverlayHeader>
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
              padding: theme.spacings.lg,
            })}
          >
            {[...Array(gridColumns).keys()].map((compareSelectIndex) => (
              <FormControl key={compareSelectIndex} sx={(theme) => ({ mt: theme.spacings.md })}>
                <SelectElement
                  control={form.control}
                  name={`selected.${compareSelectIndex}`}
                  options={compareAbleItems.map((i, id) => ({
                    id,
                    label: i?.product?.name ?? 'todo',
                  }))}
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
              padding: theme.spacings.lg,
              pt: 0,
              ':not(.ContainerWithHeader-root &)': {
                /* @todo: find a way to not have to do this (IfConfig demoMode), fix selector in demostuff */
                '& > :nth-of-type(7n + 3)': {
                  gridColumn: 'unset',
                  gridRow: 'unset',
                  display: 'unset',
                  gridAutoFlow: 'unset',
                  gridTemplateColumns: 'unset',
                  gridTemplateRows: 'unset',
                  '& > div:first-of-type': {
                    position: 'unset',
                    height: 'unset',
                  },
                  '& *': {
                    background: 'unset',
                  },
                },
              },
            })}
          />
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
              py: theme.spacings.md,
              px: theme.spacings.lg,
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
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'bottom',
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
