import { SelectElement, useForm, useFormPersist, WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { FullPageMessage, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { ProductListItems } from '../../ProductListItems/ProductListItems'
import { CompareListDocument } from '../graphql/CompareList.gql'
import { CurrentCompareUidDocument } from '../graphql/CurrentCompareUid.gql'
import { CompareRow } from './CompareRow'
import { CompareSelect } from './CompareSelect'
import { EmptyCompareListButton } from './EmptyCompareListButton'
import { MoreInformationRow } from './MoreInformationRow'

export function CompareList() {
  const { data: curCompareId } = useQuery(CurrentCompareUidDocument)

  const compareList = useQuery(CompareListDocument, {
    variables: { uid: curCompareId?.currentCompareUid?.id ?? '' },
    fetchPolicy: 'network-only',
  })
  const compareListData = compareList.data

  const form = useForm<{ selected: number[] }>({ defaultValues: { selected: [0, 1, 2] } })

  useFormPersist({ form, name: 'CompareList', storage: 'localStorage' })
  const selectedState = form.watch('selected')
  const selectedPrevious = useRef<number[]>(selectedState)
  useEffect(() => {
    selectedPrevious.current = selectedState
  }, [selectedState])

  const compareListCount = compareListData?.compareList?.item_count ?? 0
  const gridColumns = compareListCount <= 3 ? compareListCount : 3
  const compareAbleItems = compareListData?.compareList?.items
  const compareListAttributes = compareListData?.compareList?.attributes

  if (!compareAbleItems) return null

  const currentCompareItems = selectedState.map((i) => compareAbleItems[i])
  const currentCompareProducts = currentCompareItems.map((item) => item?.product)

  return (
    <>
      <LayoutOverlayHeader
        switchPoint={0}
        primary={<EmptyCompareListButton compareId={curCompareId} />}
      >
        <LayoutTitle size='small' component='span'>
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
        <Container maxWidth='xl'>
          <Box
            sx={(theme) => ({
              display: 'grid',
              gridColumnGap: theme.spacings.md,
              gridRowGap: theme.spacings.md,
              gridTemplateColumns: {
                xs: `repeat(2, 1fr)`,
                md: `repeat(3, 1fr)`,
                lg: `repeat(3, 1fr)`,
              },
              padding: theme.spacings.lg,
              pt: `calc(${theme.spacings.lg} * 2)`,
            })}
          >
            {[0, 1, 2].map((compareSelectIndex) => (
              <FormControl key={compareSelectIndex}>
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
              gridTemplateColumns: {
                xs: `repeat(2, 1fr)`,
                md: `repeat(3, 1fr)`,
                lg: `repeat(3, 1fr)`,
              },
              padding: theme.spacings.lg,
            })}
          />
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
              padding: theme.spacings.lg,
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
