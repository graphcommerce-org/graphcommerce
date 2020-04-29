import React from 'react'
import { Theme, makeStyles, Container } from '@material-ui/core'
import RichText from '../RichText'
import Link from '../Link'

const useStyles = makeStyles(({ gridSpacing, palette }: Theme) => ({
  footer: {
    // position: 'sticky',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // zIndex: -1,
    backgroundColor: palette.tertiary.main,
    color: palette.tertiary.contrastText,
  },
  container: {
    paddingTop: gridSpacing.row,
    paddingBottom: gridSpacing.row,
    display: 'grid',
    gridColumnGap: gridSpacing.column,
    gridRowGap: gridSpacing.row,
    // gridTemplateColumns: `repeat(auto-fill, minmax(${vpCalc(150, 285)}, 1fr))`,
    gridTemplateAreas: `
      "text     text     contactLink contactLink"
      "linksOne linksTwo address     contact"
    `,
  },
  text: { gridArea: 'text' },
  contactLink: { gridArea: 'contactLink' },
  linksOne: { gridArea: 'linksOne' },
  linksTwo: { gridArea: 'linksTwo' },
  address: { gridArea: 'address' },
  contact: { gridArea: 'contact' },
}))

const Footer: React.FC<GQLFooterFragment> = ({ links, address, contact, text, contactLink }) => {
  const classes = useStyles()

  const split = Math.ceil(links.length / 2)
  const col1 = links.slice(0, split)
  const col2 = links.slice(split)

  return (
    <footer className={classes.footer}>
      <Container className={classes.container}>
        <div className={classes.text}>
          <RichText {...text} condensed />
        </div>
        <div className={classes.contactLink}>{contactLink?.title}</div>
        <div className={classes.linksOne}>
          {col1.map((link) => {
            return link.title
          })}
        </div>
        <div className={classes.linksTwo}>
          {col2.map((link) => {
            return link.title
          })}
        </div>
        <div className={classes.address}>
          <RichText {...address} condensed />
        </div>
        <div className={classes.contact}>
          <RichText {...contact} condensed />
        </div>
      </Container>
    </footer>
  )
}

export default Footer
