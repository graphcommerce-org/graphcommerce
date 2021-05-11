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
  { name: 'BackNavFab' },
)

export type BackButtonProps = UseStyles<typeof useStyles> &
  ButtonProps & { down?: boolean; overflow?: boolean }

const BackButton = React.forwardRef<any, BackButtonProps>((props, ref) => {
  const classes = useStyles(props)
  const { down, children, href, overflow, ...fabProps } = props

  return (
    <Link href={href ?? '/'} passHref>
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
        <SvgImage src={iconChevronLeft} size='small' alt='chevron left' loading='eager' />
        <span className={clsx(classes.text, overflow && classes.textOverflow)}>
          {children ?? 'Home'}
        </span>
      </Button>
    </Link>
  )
})
export default BackButton
