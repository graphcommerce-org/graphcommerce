import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import RowPeopleWithText, { RowPeopleWithTextProps } from '.'
import { vpCalc } from '../Theme'
import TriangleBg from '../TriangleBg'

const useStyles = makeStyles(
  ({ breakpoints, spacings }: Theme) => ({
    root: {
      paddingTop: spacings.lg,
      paddingBottom: spacings.lg,
      [breakpoints.up('md')]: {
        gridTemplateColumns: `${vpCalc(320, 620)} 1fr`,
      },
    },
    textContainer: { gridArea: 'two' },
    peopleContainer: { gridArea: 'one' },
  }),
  { name: 'RowPeopleWithTextFlipped' },
)

const RowPeopleWithTextFlipped: React.FC<RowPeopleWithTextProps> = (props) => {
  const classes = useStyles(props)
  return (
    <TriangleBg color='white' gradient>
      <RowPeopleWithText {...props} classes={classes} />
    </TriangleBg>
  )
}

export default RowPeopleWithTextFlipped
