import { makeStyles, Theme } from '@material-ui/core'
import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      padding: theme.spacings.xs,
      fontSize: theme.typography.fontSize,
      borderBottom: `1px solid ${theme.palette.divider}`,
      '& > span': {
        display: 'flex',
        justifyContent: 'start',
      },
      '& span.MuiButton-endIcon': {
        justifyContent: 'flex-end',
        flex: '1 1',
      },
      '&:focus': {
        // fix: disableElevation does not work when button is focused
        boxShadow: 'none',
      },
    },
    startIcon: {
      color: theme.palette.primary.mutedText,
      marginRight: theme.spacings.xxs,
    },
    disabled: {
      backgroundColor: '#fff',
    },
    childText: {
      alignSelf: 'flex-start',
    },
  }),
  { name: 'AccountMenuItem' },
)

export type AccountMenuItemProps = {
  startIconSrc: string
  children: React.ReactNode
} & Omit<ButtonProps, 'endIcon' | 'startIcon' | 'disableElevation'>

export default function AccountMenuItem(props: AccountMenuItemProps) {
  const { children, startIconSrc, href, disabled, ...buttonProps } = props
  const { childText, ...classes } = useStyles()

  const button = (
    <Button
      variant='contained'
      endIcon={
        <PictureResponsiveNext
          alt='desktop_chevron_right'
          width={24}
          height={24}
          src='/icons/desktop_chevron_right.svg'
          type='image/svg+xml'
        />
      }
      startIcon={
        <PictureResponsiveNext
          alt={startIconSrc}
          width={24}
          height={24}
          src={startIconSrc}
          type='image/svg+xml'
        />
      }
      disableElevation
      disabled={disabled}
      classes={classes}
      {...buttonProps}
    >
      <span className={childText}>{children}</span>
    </Button>
  )

  return href ? <PageLink href={href}>{button}</PageLink> : button
}
