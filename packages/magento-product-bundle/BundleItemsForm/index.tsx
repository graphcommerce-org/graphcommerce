import { BundleItemsFragment } from './BundleItems.graphql'

type BundleItemsFormProps = BundleItemsFragment

export default function BundleItemsForm(props: BundleItemsFormProps) {
  const { items } = props
  return (
    <>
      {items?.map((item) => {
        if (!item?.type) return null
        const type = item.type as 'radio' | 'checkbox'

        return (
          <div key={item?.uid ?? ''}>
            {item?.title}

            {item?.required}

            {item?.type}
            {item?.options?.map((option) => (
              <div key={option?.uid ?? ''}>{option?.label}</div>
            ))}
          </div>
        )
      })}
    </>
  )
}
