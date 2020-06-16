import React from 'react'
import clsx from 'clsx'
import { Container } from '@material-ui/core'
import { useHeaderSpacing } from 'components/Header'
import useRowCollaborationStyles from './useRowCollaborationStyles'

const RowCollaboration: React.FC<GQLRowCollaborationFragment> = (props) => {
  const { title } = props
  const headerSpacing = useHeaderSpacing()
  const classes = useRowCollaborationStyles()

  console.log(props)

  return (
    <Container className={clsx(headerSpacing.paddingTop, headerSpacing.paddingBottom)}>
      <h4>{title}</h4>
      <div className={classes.imageGrid}>
        {/* {images && images.map(item => {
          <div className={classes.image}>item.url</div>
        }} */}
      </div>
      >
    </Container>
  )
}

export default RowCollaboration
