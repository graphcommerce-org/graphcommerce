import { SelectElement, useForm, useFormPersist, WaitForQueries } from '@graphcommerce/ecommerce-ui'
import {
  compareArrows,
  FullPageMessage,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container, FormControl, NoSsr } from '@mui/material'
import { useEffect, useRef } from 'react'
import { ProductListItems } from '../../ProductListItems/ProductListItems'
import { useCompareListStyles } from '../hooks/useCompareGridStyles'
import { useCompareList } from '../hooks/useCompareList'
import { CompareRow } from './CompareRow'
import { EmptyCompareListButton } from './EmptyCompareListButton'
import { MoreInformationRow } from './MoreInformationRow'

export function CompareList() {
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
    <NoSsr>
      <LayoutOverlayHeader
        switchPoint={0}
        primary={
          compareList.data?.compareList?.uid && (
            <EmptyCompareListButton compareListUid={compareList.data.compareList.uid} />
          )
        }
      >
        <LayoutTitle size='small' component='span' icon={compareArrows}>
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
        <Container maxWidth={gridColumns === 3 ? 'xl' : 'lg'}>
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
            })}
          />
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
              py: theme.spacings.md,
              px: theme.spacings.lg,
              borderRadius: theme.shape.borderRadius * 1.5,
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
    </NoSsr>
  )
}
