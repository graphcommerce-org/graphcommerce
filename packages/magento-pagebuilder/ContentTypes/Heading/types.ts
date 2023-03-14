import { TypographyProps } from '@mui/material/Typography'
import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

export type HeadingConfig = ContentTypeConfig<'heading'> & {
  appearance: 'default'
}

export type HeadingProps = AdvancedProps & {
  headingType: NonNullable<TypographyProps['variant']>
  text: string | null
}

export type HeadingContentType = ContentType<HeadingConfig, HeadingProps>
