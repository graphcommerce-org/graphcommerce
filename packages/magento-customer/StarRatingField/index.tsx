import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconStar } from '@reachdigital/next-ui/icons'
import React from 'react'
import { ProductReviewRatingInput, ProductReviewRatingMetadata } from '../../graphql'

type StarRatingFieldProps = ProductReviewRatingMetadata & {
  onChange: (id: string, value_id: string) => void
  value: ProductReviewRatingInput
}

export default function StarRatingField(props: StarRatingFieldProps) {
  const { id, name, values, onChange, value } = props

  return (
    <div>
      <SvgImage
        src={iconStar}
        size='small'
        alt='star'
        onMouseOver={() => {
          // todo: find siblings
          // todo: change icon of all previous siblings
          // todo: onMouseOut: clear all if none selected, or set all icons
        }}
        onClick={() => {
          // todo: find correct index
          // todo: fire onChange() with correct value
        }}
      />
      <SvgImage src={iconStar} size='small' alt='star' />
      <SvgImage src={iconStar} size='small' alt='star' />
      <SvgImage src={iconStar} size='small' alt='star' />
      <SvgImage src={iconStar} size='small' alt='star' />
    </div>
  )
}
