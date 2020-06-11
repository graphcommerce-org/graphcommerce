import React from 'react'
import Asset from 'components/Asset'
import { useGetAllContactCtaPeopleQuery } from 'generated/apollo'
import ContactCtaStyles from './ContactCtaStyles'

export type ContactCtaPeopleProps = GQLPersonFragment & GQLGetAllContactCtaPeopleQuery

const ContactCta: React.FC<ContactCtaPeopleProps> = ({ people }) => {
  const classes = ContactCtaStyles()

  // const { data, loading, error } = useGetAllContactCtaPeopleQuery()

  return (
    <div className={classes.root}>
      <div className={classes.persons}>
        {people &&
          people.map((person) => {
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
}

export default ContactCta
