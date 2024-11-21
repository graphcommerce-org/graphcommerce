import { Box } from '@mui/material'
import { PagebuilderRender } from '../../components/Pagebuilder/PagebuilderRender'
import { extractAdvancedProps } from '../../utils'
import type { BlockContentType } from './types'

/**
 * Page Builder Block component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Block: BlockContentType['component'] = (props) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)

  const { content } = additional

  return (
    <Box style={cssProps} className={cssClasses.join(' ')}>
      {content?.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <PagebuilderRender contentItem={child} key={index} />
      ))}
    </Box>
  )
}
