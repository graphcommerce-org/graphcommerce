import React from 'react'
import { Theme, makeStyles, Container } from '@material-ui/core'
import { JsonLd } from 'react-schemaorg'
import { AggregateRating } from 'schema-dts'
import RichText from '../RichText'
import { ChevronRight } from '../Icons'
import Link, { Button } from '../Link'

const useStyles = makeStyles(
  ({ gridSpacing, palette, breakpoints, typography, spacings }: Theme) => ({
    footer: {
      marginTop: spacings.lg,
      backgroundColor: palette.tertiary.main,
      color: palette.tertiary.contrastText,
      ...typography.body1,
    },
    containerOne: {
      paddingTop: gridSpacing.gutter,
      paddingBottom: gridSpacing.gutter,
      display: 'grid',
      gridColumnGap: gridSpacing.column,
      gridRowGap: gridSpacing.row,
      gridTemplateAreas: `
        "text"
        "contactLink"
      `,
      [breakpoints.up('sm')]: {
        gridTemplateAreas: `
          "text text contactLink contactLink"
        `,
      },
      borderBottom: `2px solid ${palette.tertiary.light}`,
    },
    text: { gridArea: 'text' },
    contactLink: {
      gridArea: 'contactLink',
      [breakpoints.up('sm')]: { textAlign: 'right' },
    },
    containerTwo: {
      paddingTop: gridSpacing.gutter,
      paddingBottom: spacings.md,
      display: 'grid',
      gridColumnGap: gridSpacing.column,
      gridRowGap: gridSpacing.row,
      gridTemplateAreas: `
        "linksOne"
        "linksTwo"
        "address"
        "contact"
      `,
      [breakpoints.up('sm')]: {
        gridTemplateAreas: `
          "linksOne address"
          "linksTwo contact"
        `,
      },
      [breakpoints.up('md')]: {
        gridTemplateAreas: `
          "linksOne linksTwo address contact"
        `,
      },
    },
    linksOne: { gridArea: 'linksOne' },
    linksTwo: { gridArea: 'linksTwo' },
    address: { gridArea: 'address' },
    contact: { gridArea: 'contact' },

    containerThree: {
      paddingBottom: spacings.md,
      display: 'grid',
      gridColumnGap: spacings.md,
      gridRowGap: spacings.xs,
      ...typography.body2,
      color: palette.tertiary[100],

      gridTemplateAreas: `
        "review"
        "copyright"
        "additional"
      `,
      [breakpoints.up('md')]: {
        justifyContent: 'center',
        gridTemplateAreas: `"review copyright additional"`,
      },
    },
    review: { gridArea: 'review' },
    copyright: { gridArea: 'copyright' },
    additional: {
      gridArea: 'additional',
      '& > a': { marginRight: 5 },
    },
  }),
  { name: 'Footer' },
)

const useRichTextStyles = makeStyles((theme: Theme) => ({
  h3: { marginTop: 0, marginBottom: 8 },
  paragraph: { marginBottom: 0 },
  italic: { color: theme.palette.tertiary[100] },
}))

const useRichTexdtContainerThree = makeStyles((theme: Theme) => ({
  paragraph: { marginBottom: 0, ...theme.typography.body2, display: 'inline' },
}))

const Footer: React.FC<GQLFooterFragment> = ({
  links,
  address,
  contact,
  text,
  contactLink,
  reviewsLink,
  additionalLinks,
}) => {
  const classes = useStyles()
  const richtTextClasses = useRichTextStyles()
  const richTexdtContainerThree = useRichTexdtContainerThree()

  const split = Math.ceil(links.length / 2)
  const linksOne = links.slice(0, split)
  const linksTwo = links.slice(split)

  return (
    <footer className={classes.footer}>
      <Container className={classes.containerOne}>
        <div className={classes.text}>
          <RichText {...text} classes={richtTextClasses} />
        </div>
        <div className={classes.contactLink}>
          {contactLink?.page && (
            <Button
              href={contactLink.page.url}
              metaRobots={contactLink.page.metaRobots}
              variant='contained'
              size='large'
              endIcon={<ChevronRight />}
            >
              {contactLink.title}
            </Button>
          )}
        </div>
      </Container>
      <Container className={classes.containerTwo}>
        <div className={classes.linksOne}>
          {linksOne.map((link) => {
            if (!link.page) return null
            return (
              <div key={link.id}>
                <Link href={link.page.url} metaRobots={link.page.metaRobots} color='inherit'>
                  {link.title}
                </Link>
              </div>
            )
          })}
        </div>
        <div className={classes.linksTwo}>
          {linksTwo.map((link) => {
            if (!link.page) return null
            return (
              <div key={link.id}>
                <Link href={link.page.url} metaRobots={link.page.metaRobots} color='inherit'>
                  {link.title}
                </Link>
              </div>
            )
          })}
        </div>
        <div className={classes.address}>
          <RichText {...address} classes={richtTextClasses} />
        </div>
        <div className={classes.contact}>
          <RichText {...contact} classes={richtTextClasses} />
          {contactLink?.page && (
            <Link
              href={contactLink.page.url}
              metaRobots={contactLink.page.metaRobots}
              color='inherit'
            >
              {contactLink.title}
            </Link>
          )}
        </div>
      </Container>
      <Container className={classes.containerThree}>
        {reviewsLink?.page && reviewsLink?.description && (
          <div className={classes.review}>
            <JsonLd<AggregateRating>
              item={{
                '@context': 'https://schema.org',
                '@type': 'AggregateRating',
                mainEntityOfPage: { '@type': 'WebSite' },
                reviewCount: 5,
                ratingCount: 5,
                ratingValue: 5,
                url: reviewsLink.page.url,
              }}
            />
            <RichText {...reviewsLink.description} classes={richTexdtContainerThree} />{' '}
            <Link
              href={reviewsLink.page.url}
              metaRobots={reviewsLink.page.metaRobots}
              color='inherit'
              underline='always'
            >
              {reviewsLink.title}
            </Link>
          </div>
        )}
        <div className={classes.copyright}>© 2007 - {new Date().getFullYear()} Reach Digital</div>
        <div className={classes.additional}>
          {additionalLinks.map((link) => {
            if (link.__typename === 'LinkInternal' && link.page)
              return (
                <Link
                  href={link.page.url}
                  metaRobots={link.page.metaRobots}
                  key={link.id}
                  color='inherit'
                  underline='always'
                >
                  {link.title}
                </Link>
              )
            if (link.__typename === 'LinkExternal')
              return (
                <a href={link.url} target='_blank' rel='noopener nofollow noreferrer' key={link.id}>
                  {link.title}
                </a>
              )
            return undefined
          })}
        </div>
      </Container>
    </footer>
  )
}

export default Footer
