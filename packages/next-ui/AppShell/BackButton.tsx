import { ButtonProps, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import Button from '../Button'
import { UseStyles } from '../Styles'
import SvgImage from '../SvgImage'
import { iconChevronLeft } from '../icons'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: 'min-content',
      pointerEvents: 'all',
      marginLeft: -14,
      zIndex: 2,
      [theme.breakpoints.down('sm')]: {
        height: 40,
        width: 40,
        textAlign: 'center',
        minWidth: 'unset',
      },
    },
    text: {
      whiteSpace: 'nowrap',
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'unset',
      },
    },
    textOverflow: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 100,
    },
  }),
  { name: 'BackButton' },
)

export type BackButtonProps = UseStyles<typeof useStyles> &
  ButtonProps & { down?: boolean; overflow?: boolean }

const BackButton = React.forwardRef<any, BackButtonProps>((props, ref) => {
  const classes = useStyles(props)
  const { down, children, href, overflow, ...fabProps } = props

  return (
    <Button
      variant='pill'
      classes={{
        root: clsx(classes.root, props.className),
        pill: classes.root,
      }}
      aria-label='Previous page'
      ref={ref}
      {...fabProps}
    >
      <SvgImage
        src={iconChevronLeft}
        size='small'
        alt='chevron back'
        loading='eager'
        mobileSize={32}
      />
      <span className={clsx(classes.text, overflow && classes.textOverflow)}>
        {children ?? 'Home'}
      </span>
    </Button>
  )
})
export default BackButton
