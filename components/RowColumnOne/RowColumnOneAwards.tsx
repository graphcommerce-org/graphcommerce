import React from 'react'
import { makeStyles, Container, Theme } from '@material-ui/core'
import Asset from 'components/Asset'
import RowColumnOneSpread from './RowColumnOneSpread'
import { RowColumnOneProps } from '.'

export type RowColumnOneAwardsProps = RowColumnOneProps & GQLGetRowColumOneAwardsQuery

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginBottom: theme.spacings.xl,
    boxShadow: theme.boxShadows.lg,
    paddingTop: theme.spacings.sm,
  },
  awards: {
    display: 'grid',
    gridTemplateColumns: `repeat(2, 1fr)`,
    padding: `${theme.gridSpacing.row} ${theme.gridSpacing.column}`,
    gap: theme.spacings.sm,
    justifyItems: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: `repeat(3, 1fr)`,
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: `repeat(4, 1fr)`,
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: `repeat(8, 1fr)`,
    },
    '& img': {
      width: '120px',
      height: 'auto',
    },
  },
}))

const RowColumnOneAwards: React.FC<RowColumnOneAwardsProps> = (props) => {
  const classes = useStyles(props)
  const { awards } = props
  return (
    <Container>
      <div className={classes.wrapper}>
        <RowColumnOneSpread {...props} />
        <div className={classes.awards}>
          {awards.map((award) => (
            <Asset key={award.id} asset={award.asset} width={120} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default RowColumnOneAwards
