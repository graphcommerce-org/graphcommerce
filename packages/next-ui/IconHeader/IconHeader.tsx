import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/material/styles'
import { IconSvg, IconSvgProps } from '../IconSvg'
import { extendableComponent } from '../Styles'

// TODO: remove all occurrences. deprecated component

export type IconHeaderSize = 'small' | 'medium' | 'large'

type IconHeaderProps = {
  children: React.ReactNode
  size?: IconHeaderSize
  noMargin?: boolean
  stayInline?: boolean
  ellipsis?: boolean
  sx?: SxProps<Theme>
} & Pick<IconSvgProps, 'src'>

type IconHeaderHeadings = 'h2' | 'h4' | 'h5'

const { classes, selectors } = extendableComponent('IconHeader', [
  'root',
  'container',
  'innerContainer',
  'breakColumnsDesktop',
  'margin',
  'ellipsis',
  'mediumFontWeight',
] as const)

export function IconHeader(props: IconHeaderProps) {
  const {
    children,
    size = 'large',
    stayInline = false,
    noMargin = false,
    ellipsis = false,
    src,
    sx = [],
  } = props

  const variants: Record<IconHeaderSize, IconHeaderHeadings> = {
    small: 'h5',
    medium: 'h4',
    large: 'h2',
  }

  return (
    <Box
      className={classes.root}
      sx={[
        {
          typography: 'subtitle1',
          textAlign: 'center',
        },
        !noMargin &&
          ((theme) => ({
            marginTop: theme.spacings.sm,
            marginBottom: theme.spacings.sm,
          })),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className={`${classes.innerContainer} ${!stayInline ? classes.breakColumnsDesktop : ''}`}
        sx={[
          {
            display: { xs: 'flex', md: stayInline ? 'flex' : 'unset' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          },
        ]}
      >
        <IconSvg src={src} />
        <Typography
          variant={variants[size]}
          component='h2'
          className={`${ellipsis ? classes.ellipsis : ''} ${
            size === 'medium' ? classes.mediumFontWeight : ''
          }`}
          sx={[
            ellipsis && {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            size === 'medium' && { fontWeight: 'bold' },
          ]}
        >
          {children}
        </Typography>
      </Box>
    </Box>
  )
}

IconHeader.selectors = selectors
