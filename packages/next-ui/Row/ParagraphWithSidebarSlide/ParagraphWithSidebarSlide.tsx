import Box from '@mui/material/Box'
import { ContainerProps } from '@mui/material/Container'
import { extendableComponent } from '../../Styles'
import { breakpointVal } from '../../Styles/breakpointVal'
import { Row } from '../Row'

export type ParagraphWithSidebarSlideProps = ContainerProps & {
  slidingItems: React.ReactNode
  background: React.ReactNode
  children: React.ReactNode
}

const name = 'ParagraphWithSidebarSlide' as const
const parts = ['root', 'wrapper', 'backstory', 'copy', 'slidingItems'] as const
const { classes } = extendableComponent(name, parts)

export function ParagraphWithSidebarSlide(props: ParagraphWithSidebarSlideProps) {
  const { background, slidingItems, children, ...containerProps } = props

  return (
    <Row maxWidth={false} {...containerProps} className={classes.root}>
      <Box
        className={classes.wrapper}
        sx={(theme) => ({
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: `${theme.spacings.md}`,
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '8fr 3fr',
          },
        })}
      >
        <Box
          className={classes.backstory}
          sx={(theme) => ({
            position: 'relative',
            '& img': {
              position: 'absolute',
              top: '0',
              zIndex: 0,
              width: '100%',
              height: '100% !important',
              objectFit: 'cover',
              filter: 'brightness(80%)',
              [theme.breakpoints.up('md')]: {
                filter: 'brightness(100%)',
                height: '100%',
              },
              ...breakpointVal(
                'borderRadius',
                theme.shape.borderRadius * 2,
                theme.shape.borderRadius * 3,
                theme.breakpoints.values,
              ),
            },
          })}
        >
          <Box
            className={classes.copy}
            sx={(theme) => ({
              color: theme.palette.secondary.contrastText,
              display: 'grid',
              zIndex: 1,
              justifyItems: 'start',
              alignContent: 'end',
              position: 'relative',
              padding: `${theme.spacings.md}`,
              '& > *': {
                zIndex: 1,
                maxWidth: 'max-content',
              },
              [theme.breakpoints.up('md')]: {
                background: 'none',
                width: '60%',
                minHeight: '130vh',
              },
              [theme.breakpoints.up('lg')]: {
                padding: `${theme.spacings.lg} ${theme.spacings.lg}`,
                width: '50%',
              },
            })}
          >
            {children}
          </Box>
          {background}
        </Box>
        <Box className={classes.slidingItems} sx={{ '& > *': { height: 'auto !important' } }}>
          {slidingItems}
        </Box>
      </Box>
    </Row>
  )
}
