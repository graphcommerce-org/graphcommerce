import React from 'react'
import clsx from 'clsx'
import { Container, Typography } from '@material-ui/core'
import { useHeaderSpacing } from 'components/Header'
import Asset from 'components/Asset'
import Partner from 'components/Partner'
import useRowCollaborationStyles from './useRowCollaborationStyles'

const RowCollaboration: React.FC<GQLRowCollaborationFragment> = (props) => {
  const { title, partners } = props
  const headerSpacing = useHeaderSpacing()
  const classes = useRowCollaborationStyles()

  return (
    <Container className={clsx(headerSpacing.paddingTop, headerSpacing.paddingBottom)}>
      <Typography component='h4' align='center' variant='h4'>
        {title}
      </Typography>
      <div className={classes.imageGrid}>
        {partners.map((partner) => (
          <span key={partner.id}>
            <Partner {...partner} />
          </span>
        ))}
      </div>
    </Container>
  )
}

export default RowCollaboration
