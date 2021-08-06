import { makeStyles } from '@material-ui/core'
import { Image, ImageProps, isStaticImport, isStaticImageData } from '@reachdigital/image'
import clsx from 'clsx'
import { forwardRef } from 'react'

type StyleProps = {
  noSize?: boolean
}

const useStyles = makeStyles(
  {
    image: ({ noSize }: StyleProps) => ({
      display: 'block',
      flexShrink: 0,
      userSelect: 'none',
      fontSize: '1.5em',
      ...(!noSize && {
        width: '1em',
        height: '1em',
      }),
    }),
  },
  { name: 'SvgImageSimple' },
)

type SvgImageSimpleProps = Omit<ImageProps, 'fixed'> & StyleProps

const SvgImageSimple = forwardRef<HTMLImageElement, SvgImageSimpleProps>((props, ref) => {
  const { className, noSize, ...imageProps } = props
  const { image } = useStyles({ noSize })

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
