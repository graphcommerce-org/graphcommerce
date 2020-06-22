import React from 'react'
import { makeStyles, Theme, Container, ContainerProps, Typography, Link } from '@material-ui/core'
import RichText from 'components/RichText'
import { UseStyles } from 'components/Theme'
import { UseRichTextStyles } from 'components/RichText/useRichTextStyles'
import AsyncIframe from 'components/AsyncIframe'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      gridColumnGap: theme.gridSpacing.column,
      gridRowGap: theme.gridSpacing.row,
      marginBottom: theme.spacings.xl,
      display: `grid`,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `
        "address"
        "businessInfo"
        "socialLinks"
        "location"
      `,
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `280px 1fr`,
        gridTemplateAreas: `
          "address      location"
          "businessInfo location"
          "socialLinks  location"
        `,
      },
    },
    addressArea: {
      gridArea: 'address',
      '& .MuiTypography-paragraph': {
        ...theme.typography.h5,
        marginBottom: 0,
      },
    },
    businessInfoArea: { gridArea: 'businessInfo' },
    socialLinksArea: { gridArea: 'socialLinks' },
    locationArea: {
      gridArea: 'location',
      width: '100%',
      height: '100%',
      minHeight: '200px',
    },
    title: {
      marginBottom: theme.spacings.xs,
    },
  }),
  { name: 'RowGoogleMap' },
)

const useRichTextStyles = makeStyles((theme: Theme) => ({
  paragraph: { margin: 0 },
  h3: { color: theme.palette.primary.main, marginBottom: 0 },
}))

export type RowGoogleMapProps = GQLRowGoogleMapFragment &
  UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    richTextClasses?: UseRichTextStyles['classes']
  }

const RowGoogleMap: React.FC<RowGoogleMapProps> = (props) => {
  const {
    address,
    businessInfo,
    location,
    socialLinks,
    richTextClasses,
    locale,
    ...containerProps
  } = props

  const {
    addressArea,
    businessInfoArea,
    socialLinksArea,
    locationArea,
    title,
    ...containerClasses
  } = useStyles(props)
  const richTextClassesAdded = useRichTextStyles()

  return (
    <Container {...containerProps} classes={containerClasses}>
      <div className={addressArea}>
        <Typography variant='body1' color='textSecondary' className={title}>
          {locale === 'nl' ? 'Adres' : 'Address'}
        </Typography>
        <RichText {...address} classes={{ ...richTextClasses, ...richTextClassesAdded }} />
      </div>
      <div className={businessInfoArea}>
        <Typography variant='body1' color='textSecondary' className={title}>
          {locale === 'nl' ? 'Zakelijk' : 'Business Info'}
        </Typography>
        <RichText {...businessInfo} classes={{ ...richTextClasses, ...richTextClassesAdded }} />
      </div>
      <div className={socialLinksArea}>
        <Typography variant='body1' color='textSecondary' className={title}>
          {locale === 'nl' ? 'Social' : 'Social'}
        </Typography>
        {socialLinks.map((link) => (
          <Link
            variant='body1'
            href={link.url}
            target='_blank'
            rel='nofollow noreferrer noopener'
            key={link.id}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <AsyncIframe
        className={locationArea}
        title='Google Maps'
        frameBorder='0'
        src={`https://www.google.com/maps/embed/v1/place?q=${location}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}`}
        loading='lazy'
      />
    </Container>
  )
}

export default RowGoogleMap
