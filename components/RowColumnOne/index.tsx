import React from 'react'
import RichText from '../RichText'

const RowColumnOne: React.FC<GQLRowColumnOneFragment> = ({ colOne }) => {
  return (
    <div>
      <RichText {...colOne} />
    </div>
  )
}

export default RowColumnOne
