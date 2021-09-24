import { Image } from '@graphcommerce/image'
import React from 'react'
import image from '../components/image.jpg'

const imgWidth = image.width
const imgHeight = image.height

function Index() {
  return (
    <>
      <h1>@graphcommerce/image</h1>

      <p>The layout should never have a layout shift when loading the page</p>
      <p>The layout should never have a layout shift when expanding a section</p>

      <h2>Image with an external image</h2>

      <details open style={{ maxWidth: 600 }}>
        <summary>
          <h3>layout=responsive</h3>
        </summary>
        <Image
          src='https://backend.reachdigital.dev/media/catalog/product/cache/63405d393cd2d0278e3cc8b45744d4a7/2/0/205_1_3.jpg'
          layout='responsive'
          width={imgWidth}
          height={imgHeight}
          sizes={{ 0: '100vw', 600: '600px' }}
        />
      </details>

      <details open>
        <summary>
          <h3>layout=fixed</h3>
        </summary>
        <div style={{ overflowX: 'scroll' }}>
          <Image
            src='https://backend.reachdigital.dev/media/catalog/product/cache/63405d393cd2d0278e3cc8b45744d4a7/2/0/205_1_3.jpg'
            layout='fixed'
            width={imgWidth / 4}
            height={imgHeight / 4}
          />
        </div>
      </details>

      <details open>
        <summary>
          <h3>layout=intrinsic</h3>
        </summary>
        <Image
          src='https://backend.reachdigital.dev/media/catalog/product/cache/63405d393cd2d0278e3cc8b45744d4a7/2/0/205_1_3.jpg'
          layout='intrinsic'
          width={imgWidth}
          height={imgHeight}
          sizes='calc(100vw - 40px)'
        />
      </details>

      <details open>
        <summary>
          <h3>layout=fill</h3>
        </summary>
        <div style={{ height: 200, backgroundColor: 'darkgray' }}>
          <Image
            src='https://backend.reachdigital.dev/media/catalog/product/cache/63405d393cd2d0278e3cc8b45744d4a7/2/0/205_1_3.jpg'
            layout='fill'
            style={{ objectFit: 'contain' }}
          />
        </div>
      </details>

      <h2>Image with an relative image</h2>

      <details>
        <summary>
          <h3>layout=responsive</h3>
        </summary>
        <Image src='/image.jpg' layout='responsive' width={imgWidth} height={imgHeight} />
      </details>

      <details>
        <summary>
          <h3>layout=fixed</h3>
        </summary>
        <Image src='/image.jpg' layout='fixed' width={imgWidth / 4} height={imgHeight / 4} />
      </details>

      <details>
        <summary>
          <h3>layout=intrinsic</h3>
        </summary>
        <Image src='/image.jpg' layout='intrinsic' width={imgWidth} height={imgHeight} />
      </details>

      <details>
        <summary>
          <h3>layout=fill</h3>
        </summary>
        <div style={{ height: 200, backgroundColor: 'darkgray' }}>
          <Image src='/image.jpg' layout='fill' style={{ objectFit: 'contain' }} />
        </div>
      </details>

      <h2>Image with an imported image</h2>

      <details>
        <summary>
          <h3>layout=responsive</h3>
        </summary>
        <Image src={image} layout='responsive' sizes='100vw' />
      </details>

      <details>
        <summary>
          <h3>layout=fixed</h3>
        </summary>
        <Image src={image} layout='fixed' width={imgWidth / 4} height={imgHeight / 4} />
      </details>

      <details>
        <summary>
          <h3>layout=intrinsic</h3>
        </summary>
        <Image src={image} layout='intrinsic' sizes='100vw' />
      </details>

      <details>
        <summary>
          <h3>layout=fill</h3>
        </summary>
        <div style={{ height: 200, backgroundColor: 'darkgray' }}>
          <Image src={image} layout='fill' style={{ objectFit: 'contain' }} />
        </div>
      </details>
    </>
  )
}

export default Index
