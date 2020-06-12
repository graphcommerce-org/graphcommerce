import React from 'react'
import Asset from 'components/Asset'
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import ContactCtaStyles from './ContactCtaStyles'

const ContactCta: React.FC<GQLRowHeroFragment> = ({ contactPeople }) => {
  const classes = ContactCtaStyles()

  return (
    contactPeople && (
      <div className={classes.root}>
        <div className={classes.persons}>
          <AvatarGroup classes={{ avatar: classes.avatarGroup }}>
            {contactPeople.map((person) => {
              return (
                <Avatar
                  key={person.id}
                  alt={person.name}
                  src={person.avatar.url}
                  className={classes.avatar}
                />
              )
            })}
          </AvatarGroup>
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
