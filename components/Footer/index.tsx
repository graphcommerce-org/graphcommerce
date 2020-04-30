import React from 'react'
import { Theme, makeStyles, Container } from '@material-ui/core'
import RichText from '../RichText'
import ChevronRight from '../Icons'
import Link, { Button } from '../Link'

const useStyles = makeStyles(
  ({ gridSpacing, palette, breakpoints, typography }: Theme) => ({
    footer: {
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
      [breakpoints.up('md')]: {
        gridTemplateAreas: `
        "text text contactLink contactLink"
      `,
      },
      borderBottom: `2px solid ${palette.tertiary.light}`,
    },
    containerTwo: {
      paddingTop: gridSpacing.gutter,
      paddingBottom: gridSpacing.gutter,
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
    text: { gridArea: 'text' },
    contactLink: { gridArea: 'contactLink', textAlign: 'right' },
    linksOne: { gridArea: 'linksOne' },
    linksTwo: { gridArea: 'linksTwo' },
    address: { gridArea: 'address' },
    contact: { gridArea: 'contact' },
  }),
  { name: 'Footer' },
)

const useRichTextStyles = makeStyles((theme: Theme) => ({
  h3: { marginTop: 0, marginBottom: 8 },
  paragraph: { marginBottom: 0 },
  italic: { color: theme.palette.tertiary[100] },
}))

const Footer: React.FC<GQLFooterFragment> = ({ links, address, contact, text, contactLink }) => {
  const classes = useStyles()
  const richtTextClasses = useRichTextStyles()

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
              Contact
            </Link>
          )}
        </div>
      </Container>
    </footer>
  )
}

export default Footer
