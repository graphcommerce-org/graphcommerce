import React from 'react'
import { makeStyles, Theme, Avatar } from '@material-ui/core'
import Asset from 'components/Asset'

const useStyles = makeStyles(
  ({ palette, typography, spacings }: Theme) => ({
    releasecard: {
      ...typography.body1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacings.lg,
      padding: '10px 30px',
    },
    image: {
      width: 56,
      height: 56,
      marginRight: 20,
    },
    date: { color: palette.secondary.mutedText },
  }),
  { name: 'ReleaseDateCard' },
)

const ReleaseDateCard: React.FC<GQLReleaseDateCardFragment> = ({ author, locale, releaseDate }) => {
  const classes = useStyles()

  if (!author || !releaseDate) {
    return null
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const releaseDateFormatted = formatter.format(new Date(releaseDate))

  return (
    <div className={classes.releasecard}>
      <Avatar alt={author.name} className={classes.image}>
        {author.avatar && <Asset alt={author.name} asset={author.avatar} width={56} />}
      </Avatar>
      <div>
        <div className={classes.date}>
          <small>{releaseDateFormatted}</small>
        </div>
        <div>
          {locale === 'nl' ? 'Door' : 'By'} {author.name}
        </div>
      </div>
    </div>
  )
}

export default ReleaseDateCard
