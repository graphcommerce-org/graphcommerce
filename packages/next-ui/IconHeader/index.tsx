import { Typography } from '@mui/material'
import clsx from 'clsx'
import { UseStyles } from '../Styles'
import { makeStyles, typography, useMergedClasses } from '../Styles/tssReact'
import { SvgIcon, SvgIconProps } from '../SvgIcon/SvgIcon'

// TODO: remove all occurrences. deprecated component

const useStyles = makeStyles({ name: 'IconHeader' })((theme) => ({
  container: {
    ...typography(theme, 'subtitle1'),
    textAlign: 'center',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  breakColumnsDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'unset',
    },
  },
  margin: {
    marginTop: theme.spacings.sm,
    marginBottom: theme.spacings.sm,
  },
  ellipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  mediumFontWeight: {
    fontWeight: 700,
  },
}))

export type IconHeaderSize = 'small' | 'medium' | 'large'

type IconHeaderProps = {
  children: React.ReactNode
  size?: IconHeaderSize
  noMargin?: boolean
  stayInline?: boolean
  ellipsis?: boolean
} & Pick<SvgIconProps, 'src'> &
  UseStyles<typeof useStyles>

type IconHeaderHeadings = 'h2' | 'h4' | 'h5'

export function IconHeader(props: IconHeaderProps) {
  const {
    children,
    size = 'large',
    stayInline = false,
    noMargin = false,
    ellipsis = false,
    src,
  } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  const variants: Record<IconHeaderSize, IconHeaderHeadings> = {
    small: 'h5',
    medium: 'h4',
    large: 'h2',
  }

  return (
    <div className={clsx(classes.container, !noMargin && classes.margin)}>
      <div className={clsx(classes.innerContainer, !stayInline && classes.breakColumnsDesktop)}>
        <SvgIcon src={src} />
        <Typography
          variant={variants[size]}
          component='h2'
          className={clsx(
            ellipsis && classes.ellipsis,
            size === 'medium' && classes.mediumFontWeight,
          )}
        >
          {children}
        </Typography>
      </div>
    </div>
  )
}
