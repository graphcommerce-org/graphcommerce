import { Container, Fab } from '@material-ui/core'
import { usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import {
  SheetHeader as SheetHeaderCore,
  SheetHeaderProps as SheetHeaderCodeProps,
} from '@reachdigital/framer-sheet'
import Link from 'next/link'
import React from 'react'
import SvgImage from '../../SvgImage'
import { iconClose } from '../../icons'
import BackButton from '../BackButton'

type SheetHeaderProps = Omit<SheetHeaderCodeProps, 'back' | 'close'>

export default function SheetHeader(props: SheetHeaderProps) {
  const router = usePageRouter()
  const { backSteps } = usePageContext()

  return (
    <Container maxWidth={false}>
      <SheetHeaderCore
        back={
          backSteps > 1 && (
            <BackButton type='button' onClick={() => router.back()}>
              Back
            </BackButton>
          )
        }
        close={
          backSteps > 0 ? (
            <Fab size='small' type='button' onClick={() => router.go(backSteps * -1)}>
              <SvgImage src={iconClose} alt='Close overlay' loading='eager' />
            </Fab>
          ) : (
            <Link href='/' passHref>
              <Fab size='small'>
                <SvgImage src={iconClose} alt='Close overlay' loading='eager' />
              </Fab>
            </Link>
          )
        }
        {...props}
      />
    </Container>
  )
}
