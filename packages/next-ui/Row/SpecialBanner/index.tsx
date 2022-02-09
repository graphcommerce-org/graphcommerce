import { Box, ContainerProps, Typography } from '@mui/material'
import { Row } from '..'
import { extendableComponent } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'

export type SpecialBannerProps = ContainerProps & {
  asset?: React.ReactNode
  pageLinks?: React.ReactNode
  topic: React.ReactNode
  children: React.ReactNode
}

const name = 'SpecialBanner' as const
const parts = ['root', 'wrapper', 'copy', 'asset', 'topic', 'links', 'textContainer'] as const
const { classes } = extendableComponent(name, parts)

export function SpecialBanner(props: SpecialBannerProps) {
  const { asset, topic, pageLinks, children, ...containerProps } = props

  return (
    <Row maxWidth={false} {...containerProps} className={classes.root}>
      <Row
        maxWidth={false}
        className={classes.wrapper}
        disableGutters
        sx={(theme) => ({
          display: 'grid',
          background: theme.palette.background.paper,
          justifyItems: 'center',
          columnGap: `${theme.spacings.lg}`,
          paddingTop: theme.spacings.lg,
          paddingBottom: theme.spacings.lg,
          justifySelf: 'start',
          borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
          [theme.breakpoints.up('md')]: {
            padding: 0,
            background: 'none',
            justifySelf: 'center',
            gridTemplateColumns: '1fr 1fr',
            columnGap: `${theme.spacings.lg}`,
          },
        })}
      >
        <Box
          className={classes.asset}
          sx={(theme) => ({
            width: responsiveVal(200, 900),
            height: 'auto',
            marginBottom: theme.spacings.md,
            '& img': {
              width: responsiveVal(200, 900),
              height: 'auto',
              objectFit: 'cover',
              borderRadius: responsiveVal(
                theme.shape.borderRadius * 2,
                theme.shape.borderRadius * 3,
              ),
            },
            [theme.breakpoints.up('lg')]: {
              width: responsiveVal(250, 900),
              height: 'auto',
              '& img': {
                width: responsiveVal(250, 900),
                height: 'auto',
                objectFit: 'cover',
              },
            },
            [theme.breakpoints.between('md', 'xl')]: {
              width: '100%',
              '& img': {
                width: '100%',
              },
            },
          })}
        >
          {asset}
        </Box>
        <Box
          className={classes.copy}
          sx={(theme) => ({
            color: theme.palette.text.primary,
            maxWidth: '70%',
            display: 'grid',
            alignContent: 'center',
            justifyContent: 'center',
            '& > *': {
              maxWidth: 'max-content',
            },
          })}
        >
          {topic && (
            <Typography variant='overline' className={classes.topic}>
              {topic}
            </Typography>
          )}
          <Box
            className={classes.textContainer}
            sx={(theme) => ({
              maxWidth: '70%',
              [theme.breakpoints.up('md')]: {
                maxWidth: '100%',
              },
            })}
          >
            {children}
          </Box>
          <Box
            className={classes.links}
            sx={(theme) => ({
              typography: 'body2',
              [theme.breakpoints.up('md')]: { typography: 'h4' },
              '& > *': { color: theme.palette.text.primary },
            })}
          >
            {pageLinks}
          </Box>
        </Box>
      </Row>
    </Row>
  )
}
