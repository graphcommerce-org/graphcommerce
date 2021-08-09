import { makeStyles } from '@material-ui/core'
import { Image, ImageProps } from '@reachdigital/image'
import clsx from 'clsx'
import { forwardRef } from 'react'

const useStyles = makeStyles(
  {
    image: {
      display: 'block',
      flexShrink: 0,
      userSelect: 'none',
      fontSize: '1.5rem',
      width: '1em',
      height: '1em',
    },
  },
  { name: 'SvgImageSimple' },
)

type SvgImageSimpleProps = Omit<ImageProps, 'fixed'>

const SvgImageSimple = forwardRef<HTMLImageElement, SvgImageSimpleProps>((props, ref) => {
  const { className, ...imageProps } = props
  const { image } = useStyles()

  return (
    <Image
      {...imageProps}
      ref={ref}
      layout='fixed'
      className={clsx(className, image)}
      unoptimized
    />
  )
})

export default SvgImageSimple
