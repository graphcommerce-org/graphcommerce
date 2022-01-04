import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles({
  root: ({ width, height }: Props) => ({
    position: `relative`,
    paddingTop: `calc(100% / ${width} * ${height})`,
    '& img, & video': {
      position: 'absolute',
      left: 0,
      top: 0,
      width: `100%`,
      height: `auto`,
    },
  }),
})

export type Props = { width: number; height: number }
export type AspectRatioContainerProps = Props & UseStyles<typeof useStyles>

const AspectRatioContainer: React.FC<AspectRatioContainerProps> = ({ children, ...styleProps }) => {
  const classes = useStyles(styleProps)
  return <div className={classes.root}>{children}</div>
}

export default AspectRatioContainer
