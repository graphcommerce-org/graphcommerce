import { FormPersist, useForm, UseFormReturn, useWatch } from '@graphcommerce/ecommerce-ui'
import { filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { useCompareList } from '../hooks'

type CompareListFormProps = { children?: React.ReactNode }

type FormFields = { selected: number[] }

type CompareFormContextType = Omit<UseFormReturn<FormFields>, 'formState' | 'watch'> & {
  selectedPrevious: React.MutableRefObject<number[]>
}

const CompareFormContext = createContext<CompareFormContextType | undefined>(undefined)

export function CompareListForm(props: CompareListFormProps) {
  const { children } = props

  const compareList = useCompareList()
  const compareListData = compareList.data
  const compareListCount = compareListData?.compareList?.item_count ?? 0
  const gridColumns = compareListCount <= 3 ? compareListCount : 3

  const form = useForm<FormFields>({
    defaultValues: { selected: [...Array(gridColumns).keys()] },
  })

  const selectedState = form.watch('selected')
  const selectedPrevious = useRef<number[]>(selectedState)
  const compareAbleItems = compareListData?.compareList?.items

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
  }, [compareAbleItems?.length, compareListCount, form, gridColumns, selectedState])

  const value = useMemo(
    () => ({ ...form, selectedPrevious }) satisfies CompareFormContextType,
    [form],
  )
  return (
    <CompareFormContext.Provider value={value}>
      <FormPersist form={form} name='CompareList' />
      {children}
    </CompareFormContext.Provider>
  )
}

export function useCompareForm() {
  const context = useContext(CompareFormContext)
  if (!context) throw Error('useCompareForm must be used inside a CompareForm')
  return context
}

export function useCompareVisibleItems() {
  const { control } = useCompareForm()
  const selected = useWatch<FormFields>({ control, name: 'selected' })

  const selectedState = Array.isArray(selected) ? selected : [selected]

  const compareList = filterNonNullableKeys(useCompareList().data?.compareList?.items)
  return selectedState.map((i) => compareList[i]).filter(nonNullable)
}
