import Box from '@mui/material/Box'
import { ContainerProps } from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { extendableComponent } from '../../Styles'
import { breakpointVal } from '../../Styles/breakpointVal'
import { responsiveVal } from '../../Styles/responsiveVal'
import { Row } from '../Row'

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
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
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
              ...breakpointVal(
                'borderRadius',
                theme.shape.borderRadius * 2,
                theme.shape.borderRadius * 3,
                theme.breakpoints.values,
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
              [theme.breakpoints.up('md')]: { maxWidth: '100%' },
            })}
          >
            {children}
          </Box>
          <Box className={classes.links} sx={{ typography: { xs: 'body2', md: 'h4' } }}>
            {pageLinks}
          </Box>
        </Box>
      </Row>
    </Row>
  )
}
