import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import NewsletterToggle from '../NewsletterToggle'

const useStyles = makeStyles(
  (theme: Theme) => ({
    signup: {
      background: theme.palette.background.highlight,
      display: 'grid',
      alignItems: 'center',
      gridAutoFlow: 'column',
      columnGap: theme.spacings.xxs,
      padding: theme.spacings.sm,
      ...theme.typography.body1,
      marginTop: theme.spacings.sm,
      borderRadius: 4,
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: `
        "a a a"
        "b c c"
      `,
      [theme.breakpoints.up('sm')]: {
        gridTemplateAreas: `"a b c"`,
        gridTemplateColumns: '4fr 1fr',
      },
    },
    signupForm: {
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  }),
  {
    name: 'SignupNewsletter',
  },
)

type SignupNewsletterProps = {
  email: string
}

export default function SignupNewsletter(props: SignupNewsletterProps) {
  const { email } = props
  const classes = useStyles()

  return (
    <div className={classes.signup}>
      <b>Sign up for our newsletter and stay updated</b>
      <div className={classes.signupForm}>
        <NewsletterToggle color='primary' hideErrors />
        {email}
      </div>
    </div>
  )
}
