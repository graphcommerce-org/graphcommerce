import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { vpCalc } from 'components/Theme'
import TriangleBg from 'components/TriangleBg'
import RowPeopleWithText, { RowPeopleWithTextProps } from '.'

const useStyles = makeStyles(
  ({ breakpoints, spacings }: Theme) => ({
    root: {
      paddingTop: spacings.lg,
      paddingBottom: spacings.lg,
      gridTemplateAreas: `
        "two"
        "one"
      `,
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
