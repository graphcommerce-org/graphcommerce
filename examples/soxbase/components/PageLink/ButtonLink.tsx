import { makeStyles, Theme } from '@material-ui/core'
import ChevronRight from '@material-ui/icons/ChevronRight'
import NextButton, { ButtonProps } from '@reachdigital/next-ui/Button'
import NextUiPageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { PageLinkFragment } from './PageLink.gql'

type PageLinkProps = PageLinkFragment & ButtonProps

const useStyles = makeStyles((theme: Theme) => ({
  buttonLink: {
    color: '#000',
    textDecoration: 'none',
    padding: `${theme.spacings.xs} 0`,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 0,
    ...theme.typography.body1,
    '& > *': {
      display: 'grid',
      gridAutoFlow: 'column',
      justifyContent: 'space-between',
      gap: `${theme.spacings.xs}`,
    },
    '& > * > span': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
}))

export default function ButtonLink(props: PageLinkProps) {
  const { title, url, ...buttonProps } = props
  const classes = useStyles()

  return (
    <NextUiPageLink href={url}>
      <NextButton {...buttonProps} className={classes.buttonLink}>
        <span>{title}</span>
        <ChevronRight color='inherit' />
      </NextButton>
    </NextUiPageLink>
  )
}
