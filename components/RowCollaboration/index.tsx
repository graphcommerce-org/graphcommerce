import React from 'react'
import clsx from 'clsx'
import { Container, Typography } from '@material-ui/core'
import { useHeaderSpacing } from 'components/Header'
import Asset from 'components/Asset'
import AspectRatioContainer from 'components/AspectRatioContainer'
import useRowCollaborationStyles from './useRowCollaborationStyles'

const RowCollaboration: React.FC<GQLRowCollaborationFragment> = (props) => {
  const { title, companyLogos } = props
  const headerSpacing = useHeaderSpacing()
  const classes = useRowCollaborationStyles()

  return (
    <Container className={clsx(headerSpacing.paddingTop, headerSpacing.paddingBottom)}>
      <Typography component='h4' align='center' variant='h4'>
        {title}
      </Typography>
      <div className={classes.imageGrid}>
        {companyLogos.map((item, key) => (
          <div className={classes.image} key={key}>
            <Asset asset={item} width={160} />
          </div>
        ))}
      </div>
    </Container>
  )
}

export default RowCollaboration
