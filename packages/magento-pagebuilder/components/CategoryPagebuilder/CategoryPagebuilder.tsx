// eslint-disable-next-line import/no-extraneous-dependencies
import { CategoryDescription as CategoryDescriptionHtml } from '@graphcommerce/magento-category'
import { extendableComponent } from '@graphcommerce/next-ui'
import { SxProps, Theme } from '@mui/material'
import { getComponentByType } from '../../renderTypes'
import { ContentTypeConfig } from '../../types'
import { PagebuilderProvider } from '../RenderChildren/PagebuilderProvider'
import { PagebuilderRender } from '../RenderChildren/PagebuilderRender'
import { CategoryPagebuilderFragment } from './CategoryPagebuilder.gql'

type CategoryPagebuilderProps = Omit<CategoryPagebuilderFragment, 'uid'> & { sx?: SxProps<Theme> }

export function CategoryPagebuilder(props: CategoryPagebuilderProps) {
  const { description, pagebuilder, sx } = props

  if (pagebuilder)
    return (
      <PagebuilderProvider getComponentByType={getComponentByType}>
        <PagebuilderRender contentItem={pagebuilder as ContentTypeConfig} />
      </PagebuilderProvider>
    )
  if (description) return <CategoryDescriptionHtml description={description} sx={sx} />

  return null
}
