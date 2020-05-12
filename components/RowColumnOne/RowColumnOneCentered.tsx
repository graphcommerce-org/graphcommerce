import React from 'react'
import { makeStyles, Container, Theme } from '@material-ui/core'
import Asset from 'components/Asset'
import RowColumnOne, { RowColumnOneProps } from '.'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginBottom: theme.spacings.xl,
    marginTop: theme.spacings.xl,
    textAlign: 'center',
    maxWidth: `calc(1050px + calc(${theme.gridSpacing.column} * 2))`,
    margin: `0 auto`,
    position: 'relative',
  },
  imageContainer: {
    margin: `0 auto`,
    textAlign: `center`,
    '& img': {
      width: `100%`,
      height: `auto`,
    },
  },
}))

const RowColumnOneCentered: React.FC<RowColumnOneProps> = (props) => {
  const classes = useStyles(props)
  const { colOneIcon } = props
  return (
    <Container>
      <div className={classes.wrapper}>
        {colOneIcon && (
          <div className={classes.imageContainer}>
            <Asset asset={colOneIcon} width={2210} />
          </div>
        )}
        <RowColumnOne {...props} />
      </div>
    </Container>
  )
}

export default RowColumnOneCentered
