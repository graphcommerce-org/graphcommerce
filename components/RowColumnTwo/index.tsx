import React from 'react'
import RichText from '../RichText'

const RowColumnTwo: React.FC<GQLRowColumnTwoFragment> = ({ colOne, colTwo }) => {
  return (
    <div>
      <RichText {...colOne} />
      <RichText {...colTwo} />
    </div>
  )
}

export default RowColumnTwo
