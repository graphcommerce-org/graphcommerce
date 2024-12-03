import type { TypographyProps } from '@mui/material'
import type { ContentType, ContentTypeConfig } from '../../types'
import type { AdvancedProps } from '../../utils'

export type HeadingConfig = ContentTypeConfig<'heading'> & {
  appearance: 'default'
}

export type HeadingProps = AdvancedProps & {
  headingType: NonNullable<TypographyProps['variant']>
  text: string | null
}

export type HeadingContentType = ContentType<HeadingConfig, HeadingProps>
