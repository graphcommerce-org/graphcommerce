import React from 'react'
import { GQLRowColumnThreeFragment } from '../../generated/graphql'
import RichText from '../RichText'

const RowColumnThree: React.FC<GQLRowColumnThreeFragment> = ({ colOne, colTwo, colThree }) => {
  return (
    <div>
      <RichText {...colOne} />
      <RichText {...colTwo} />
      <RichText {...colThree} />
    </div>
  )
}

export default RowColumnThree
