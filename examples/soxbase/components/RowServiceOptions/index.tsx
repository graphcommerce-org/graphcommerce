import { Container, Theme, Typography } from '@material-ui/core'
import Chat from '@material-ui/icons/ChatBubbleOutline'
import Email from '@material-ui/icons/EmailOutlined'
import Phone from '@material-ui/icons/PhoneIphoneOutlined'
import { makeStyles } from '@material-ui/styles'
import RichText from '@reachdigital/graphcms-ui/RichText'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { RowServiceOptionsFragment } from './RowServiceOptions.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.lg}`,
      [theme.breakpoints.up('md')]: {
        marginBottom: `${theme.spacings.xl}`,
      },
    },
    title: {
      marginBottom: `${theme.spacings.md}`,
    },
    optionsWrapper: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 280)}, 1fr))`,
      gap: `${theme.spacings.sm}`,
    },
    contactOption: {
      display: 'grid',
      gridAutoFlow: 'row',
      justifyItems: 'center',
      gap: `${theme.spacings.xs}`,
      border: `1px solid ${theme.palette.grey[300]}`,
      padding: `${theme.spacings.sm}`,
      borderRadius: '6px',
      cursor: 'pointer',
      textAlign: 'center',
    },
    wrapper: {
      paddingTop: `${theme.spacings.lg}`,
    },
  }),
  { name: 'RowServiceOptions' },
)

const useRichTextOne = makeStyles((theme: Theme) => ({
  paragraph: {
    fontSize: responsiveVal(10, 16),
  },
}))

export default function RowServiceOptions(props: RowServiceOptionsFragment) {
  const { serviceOptionsTitle, serviceOptions } = props
  const classes = useStyles()
  const richTextOneClasses = useRichTextOne(props)

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.wrapper}>
        <Typography variant='h5' className={classes.title}>
          {serviceOptionsTitle}
        </Typography>

        <div className={classes.optionsWrapper}>
          {serviceOptions.map((serviceOption) => (
            <PageLink key={serviceOption.title} href={serviceOption.url}>
              <div className={classes.contactOption}>
                {serviceOption.title.toLowerCase() === 'e-mail' && <Phone color='inherit' />}
                {serviceOption.title.toLowerCase() === 'phone' && <Email color='inherit' />}
                {serviceOption.title.toLowerCase() === 'chat' && <Chat color='inherit' />}
                <Typography variant='h6'>{serviceOption.title}</Typography>
                {serviceOption.description && (
                  <RichText classes={richTextOneClasses} {...serviceOption.description} />
                )}
              </div>
            </PageLink>
          ))}
        </div>
      </div>
    </Container>
  )
}
