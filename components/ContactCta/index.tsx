import React from 'react'
import Asset from 'components/Asset'
import ContactCtaStyles from './ContactCtaStyles'

const ContactCta: React.FC<GQLRowHeroFragment> = ({ contactPeople }) => {
  const classes = ContactCtaStyles()

  return (
    contactPeople && (
      <div className={classes.root}>
        <div className={classes.persons}>
          {contactPeople.map((person) => {
            return (
              <a
                key={person.id}
                href='tel:0717440084'
                className={classes.person}
                title={`Bel met ${person.name}`}
              >
                {person.avatar && <Asset asset={person.avatar} width={49} />}
              </a>
            )
          })}
        </div>
        <span className={classes.ctaMessage}>
          <span>Even sparren?</span>{' '}
          <strong>
            <a href='tel:0717440084'>071 744 0084</a>
          </strong>
        </span>
      </div>
    )
  )
}

export default ContactCta
