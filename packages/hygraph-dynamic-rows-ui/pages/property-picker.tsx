import { Wrapper } from '@hygraph/app-sdk-react'
import React, { useEffect } from 'react'
import { PropertyPicker } from '../components/PropertyPicker'

export default function DRPropertyPicker() {
  const fieldContainer = React.useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    /**
     * Some styling is being undone here to resolve conflicts between Hygraph App SDK and CssAndFramerMotionProvider.
     */
    const frameBox1 = fieldContainer?.current?.parentElement
    if (frameBox1) {
      frameBox1.style.position = 'static'
      frameBox1.style.minHeight = 'unset'
    }

    const frameBox2 = frameBox1?.previousSibling as HTMLDivElement | null
    if (frameBox2) {
      frameBox2.style.minHeight = 'unset'
    }

    const body = frameBox1?.parentElement
    if (body) {
      body.style.margin = '0'
    }

    const html = body?.parentElement
    if (html) {
      html.style.background = 'transparent'
      html.style.overflow = 'hidden'
    }
  }, [fieldContainer])

  return (
    <div ref={fieldContainer}>
      <Wrapper>
        <PropertyPicker />
      </Wrapper>
    </div>
  )
}
