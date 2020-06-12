import React from 'react'
import { makeStyles, Container, ContainerProps, Theme } from '@material-ui/core'
import clsx from 'clsx'
import RichText from 'components/RichText'
import Asset from 'components/Asset'
import { UseStyles } from 'components/Theme'
import { UseRichTextStyles } from 'components/RichText/useRichTextStyles'
import { useHeaderSpacing } from 'components/Header'
import { Button } from 'components/Link'
import { ChevronRight } from 'components/Icons'
import TriangleBg, { TriangleBgProps } from 'components/TriangleBg'
import ContactCta from 'components/ContactCta'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      gridColumnGap: theme.gridSpacing.gutter,
      gridRowGap: theme.gridSpacing.row,
      // marginBottom: theme.spacings.xl,
      display: `grid`,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `"one" "two"`,
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `"one two"`,
      },
      alignItems: 'center',
    },
    colOne: { gridArea: 'one' },
    colTwo: { gridArea: 'two' },
    video: {
      width: '100%',
      height: '100%',
      minHeight: '60vh',
      objectFit: 'cover',
    },
  }),
  { name: 'RowHero' },
)

export type RowHeroProps = GQLRowHeroFragment &
  UseStyles<typeof useStyles> & {
    richTextClasses?: UseRichTextStyles['classes']
    triangleBgProps?: Partial<TriangleBgProps>
  } & ContainerProps

const RowHero: React.FC<RowHeroProps> = (props) => {
  const { text, asset, links, contactPeople, richTextClasses, triangleBgProps, children } = props
  const { video, colOne, colTwo, ...containerClasses } = useStyles(props)
  const headerSpacing = useHeaderSpacing()

  return (
    <TriangleBg color='primary' gradient {...triangleBgProps}>
      <Container
        classes={containerClasses}
        className={clsx(headerSpacing.paddingTop, headerSpacing.paddingBottom)}
      >
        {children ? (
          <div className={colOne}>{children}</div>
        ) : (
          asset && <Asset asset={asset} className={clsx(video, colOne)} />
        )}
        <div className={colTwo}>
          <RichText {...text} classes={richTextClasses} />
          <div>
            {links.map((link) => {
              if (link.__typename === 'LinkInternal' && link.page)
                return (
                  <Button
                    href={link.page.url}
                    metaRobots={link.page.metaRobots}
                    key={link.id}
                    size='large'
                    variant='contained'
                    color='primary'
                    endIcon={<ChevronRight />}
                  >
                    {link.title}
                  </Button>
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
          <ContactCta {...props} />
        </div>
      </Container>
    </TriangleBg>
  )
}

export default RowHero
