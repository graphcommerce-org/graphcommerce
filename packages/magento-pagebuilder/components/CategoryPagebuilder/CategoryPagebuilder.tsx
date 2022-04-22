// eslint-disable-next-line import/no-extraneous-dependencies
import { CategoryDescription as CategoryDescriptionHtml } from '@graphcommerce/magento-category'
import { extendableComponent } from '@graphcommerce/next-ui'
import { SxProps, Theme } from '@mui/material'
import { getRenderType } from '../../renderTypes'
import { PagebuilderProvider } from '../RenderChildren/PagebuilderProvider'
import { PagebuilderRender } from '../RenderChildren/PagebuilderRender'
import { CategoryPagebuilderFragment } from './CategoryPagebuilder.gql'

type CategoryPagebuilderProps = Omit<CategoryPagebuilderFragment, 'uid'> & { sx?: SxProps<Theme> }

const cmpName = 'CategoryPagebuilder' as const
const parts = ['root'] as const
const { classes } = extendableComponent(cmpName, parts)

export function CategoryPagebuilder(props: CategoryPagebuilderProps) {
  const { description, pagebuilder } = props

  if (pagebuilder)
    return (
      <PagebuilderProvider getRenderType={getRenderType}>
        <PagebuilderRender {...pagebuilder} />
      </PagebuilderProvider>
    )
  if (description) return <CategoryDescriptionHtml description={description} />

  return null
}
