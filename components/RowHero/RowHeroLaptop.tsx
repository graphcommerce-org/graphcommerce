import React from 'react'
import DeviceContainerLaptop from 'components/DeviceContainer/Laptop'
import Asset from 'components/Asset'
import clsx from 'clsx'
import { useHeaderSpacing } from 'components/Header'
import { Button } from 'components/Link'
import { ChevronRight } from 'components/Icons'
import { Container, makeStyles, Theme } from '@material-ui/core'
import RichText from 'components/RichText'
import ContactCta from 'components/ContactCta'
import RowHeroLaptopStyles from './RowHeroLaptopStyles'
import { RowHeroProps } from '.'

const useLaptopStyles = makeStyles((theme: Theme) => ({
  [theme.breakpoints.up('md')]: {
    root: {
      width: 'calc(100% + 20vw)',
      left: '-20vw',
      maxWidth: '1100px',
    },
  },
}))

const RowHeroLaptop: React.FC<RowHeroProps> = (props) => {
  const { text, asset, links, showContactCta, id, richTextClasses, children } = props
  const classes = RowHeroLaptopStyles()
  const headerSpacing = useHeaderSpacing()
  const DeviceLaptopStyles = useLaptopStyles()

  return (
    <div className={classes.wrapper}>
      <Container className={clsx(headerSpacing.paddingTop, classes.grid)}>
        {children ? (
          <div className={classes.colOne}>{children}</div>
        ) : (
          asset && (
            <div className={classes.assetContainer}>
              <DeviceContainerLaptop classes={DeviceLaptopStyles}>
                <Asset asset={asset} width={304} className={clsx(classes.video, classes.colOne)} />
              </DeviceContainerLaptop>
            </div>
          )
        )}
        <div className={classes.colTwo}>
          <RichText {...text} classes={richTextClasses} />
          <div>
            {links.map((link) => {
              if (link.__typename === 'LinkInternal' && link.page && link.description)
                return (
                  <div key={link.id} className={classes.ctaBlock}>
                    <small>
                      <RichText {...link.description} className={classes.paragraph} />
                    </small>
                    <Button
                      href={link.page.url}
                      metaRobots={link.page.metaRobots}
                      variant='contained'
                      color='default'
                      endIcon={<ChevronRight />}
                      size='large'
                      classes={{ root: classes.button }}
                      disableElevation
                    >
                      {link.title}
                    </Button>
                  </div>
                )
              if (link.__typename === 'LinkExternal')
                return (
                  <a
                    href={link.url}
                    target='_blank'
                    rel='noopener nofollow noreferrer'
                    key={link.id}
                  >
                    {link.title}
                  </a>
                )
              return undefined
            })}
          </div>
          {showContactCta && showContactCta === true && <ContactCta id={id} />}
        </div>
      </Container>
    </div>
  )
}

export default RowHeroLaptop
