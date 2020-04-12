import { makeStyles, Theme } from '@material-ui/core'

const useContactStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'grid',
    padding: `${theme.gridSpacing.row} 0`,
    rowGap: theme.gridSpacing.row,

    gridTemplateColumns: '1fr',
    gridTemplateAreas: `
      "name"
      "email"
      "phoneNumber"
      "subject"
      "message"
      "attachment"
      "submit"
    `,

    [theme.breakpoints.up('md')]: {
      columnGap: theme.gridSpacing.column,
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateAreas: `
       "name       email   phoneNumber"
       "subject    subject subject"
       "message    message message"
       "attachment .  submit"`,
    },
  },
  name: { gridArea: 'name' },
  email: { gridArea: 'email' },
  phoneNumber: { gridArea: 'phoneNumber' },
  subject: { gridArea: 'subject' },
  message: { gridArea: 'message' },
  attachment: { gridArea: 'attachment' },
  submit: { gridArea: 'submit' },
}))

export default useContactStyles
