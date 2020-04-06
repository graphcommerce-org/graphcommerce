import React from 'react'
import { number } from '@storybook/addon-knobs'
import PictureResponsive from '.'

export default {
  title: 'components|PictureResponsive',
}

export const cover = () => (
  <PictureResponsive
    srcSets={{
      'image/webp':
        'https://media.graphcms.com/resize=fit:max,w:400/output=c:true,f:webp,t:true/Fm8jSWwxTgaWs6JDAV3w 400w, https://media.graphcms.com/resize=fit:max,w:600/output=c:true,f:webp,t:true/Fm8jSWwxTgaWs6JDAV3w 600w, https://media.graphcms.com/resize=fit:max,w:800/output=c:true,f:webp,t:true/Fm8jSWwxTgaWs6JDAV3w 800w, https://media.graphcms.com/resize=fit:max,w:1000/output=c:true,f:webp,t:true/Fm8jSWwxTgaWs6JDAV3w 1000w, https://media.graphcms.com/resize=fit:max,w:1200/output=c:true,f:webp,t:true/Fm8jSWwxTgaWs6JDAV3w 1200w, https://media.graphcms.com/resize=fit:max,w:1400/output=c:true,f:webp,t:true/Fm8jSWwxTgaWs6JDAV3w 1400w, https://media.graphcms.com/resize=fit:max,w:1600/output=c:true,f:webp,t:true/Fm8jSWwxTgaWs6JDAV3w 1600w',
      'image/jpeg':
        'https://media.graphcms.com/resize=fit:max,w:400/Fm8jSWwxTgaWs6JDAV3w 400w, https://media.graphcms.com/resize=fit:max,w:600/Fm8jSWwxTgaWs6JDAV3w 600w, https://media.graphcms.com/resize=fit:max,w:800/Fm8jSWwxTgaWs6JDAV3w 800w, https://media.graphcms.com/resize=fit:max,w:1000/Fm8jSWwxTgaWs6JDAV3w 1000w, https://media.graphcms.com/resize=fit:max,w:1200/Fm8jSWwxTgaWs6JDAV3w 1200w, https://media.graphcms.com/resize=fit:max,w:1400/Fm8jSWwxTgaWs6JDAV3w 1400w, https://media.graphcms.com/resize=fit:max,w:1600/Fm8jSWwxTgaWs6JDAV3w 1600w',
    }}
    alt='img'
    width={396} // Rendere width of image on Nexus5X
    height={254}
    style={{
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 1px 8px 0px, rgba(0, 0, 0, 0.04) 0px 3px 4px 0px, rgba(0, 0, 0, 0.02) 0px 3px 3px -2px',
    }}
  />
)

export const containAndLazy = () => (
  <>
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Scroll down to see image, open your inspector to see lazy loading
    </div>
    <div
      style={{
        height: '3000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PictureResponsive
        srcSets={{
          'image/webp':
            'https://media.graphcms.com/resize=fit:max,w:400/output=c:true,f:webp,t:true/j2eef02cQCWRh0Q4TQiR 400w, https://media.graphcms.com/resize=fit:max,w:600/output=c:true,f:webp,t:true/j2eef02cQCWRh0Q4TQiR 600w, https://media.graphcms.com/resize=fit:max,w:800/output=c:true,f:webp,t:true/j2eef02cQCWRh0Q4TQiR 800w, https://media.graphcms.com/resize=fit:max,w:1000/output=c:true,f:webp,t:true/j2eef02cQCWRh0Q4TQiR 1000w, https://media.graphcms.com/resize=fit:max,w:1200/output=c:true,f:webp,t:true/j2eef02cQCWRh0Q4TQiR 1200w, https://media.graphcms.com/resize=fit:max,w:1400/output=c:true,f:webp,t:true/j2eef02cQCWRh0Q4TQiR 1400w, https://media.graphcms.com/resize=fit:max,w:1600/output=c:true,f:webp,t:true/j2eef02cQCWRh0Q4TQiR 1600w',
          'image/jpeg':
            'https://media.graphcms.com/resize=fit:max,w:400/j2eef02cQCWRh0Q4TQiR 400w, https://media.graphcms.com/resize=fit:max,w:600/j2eef02cQCWRh0Q4TQiR 600w, https://media.graphcms.com/resize=fit:max,w:800/j2eef02cQCWRh0Q4TQiR 800w, https://media.graphcms.com/resize=fit:max,w:1000/j2eef02cQCWRh0Q4TQiR 1000w, https://media.graphcms.com/resize=fit:max,w:1200/j2eef02cQCWRh0Q4TQiR 1200w, https://media.graphcms.com/resize=fit:max,w:1400/j2eef02cQCWRh0Q4TQiR 1400w, https://media.graphcms.com/resize=fit:max,w:1600/j2eef02cQCWRh0Q4TQiR 1600w',
        }}
        alt='hio'
        width={898}
        height={1338}
        style={{
          width: '400px',
          maxHeight: '300px',
          objectFit: 'contain',
          objectPosition: '25% 0',
          boxShadow:
            'rgba(0, 0, 0, 0.1) 0px 1px 8px 0px, rgba(0, 0, 0, 0.04) 0px 3px 4px 0px, rgba(0, 0, 0, 0.02) 0px 3px 3px -2px',
        }}
      />
    </div>
  </>
)

export const stressTest = () => {
  const seed = number('Image Seed', 0)
  const count = number('Image Count', 100, {
    range: true,
    min: 10,
    max: 1000,
    step: 10,
  })
  const images: number[] = Array.apply(null, Array(count)).map((x, i) => i)
  return (
    <>
      <h1>Stress test lazy loading images.</h1>
      <p style={{ fontStyle: 'italic' }}>
        Please note: `lazy=loading`'s automatic rootMargin functionality doesn&apos;t work when you
        are scrolling inside a div, so it doesn&apos;t work in this demo, open in separate tab on
        the top right.
      </p>
      <p style={{ fontStyle: 'italic' }}>
        Please note: Storybook doesn&apos;t do SSR so the loading experience is different when
        implemented with a proper SSR solution.
      </p>
      {images.map((num) => {
        const image = num + seed
        return (
          <PictureResponsive
            key={`image${image}`}
            srcSets={{
              'image/webp': `https://i.picsum.photos/id/${image}/400/400.webp 400w, https://i.picsum.photos/id/${image}/600/600.webp 600w, https://i.picsum.photos/id/${image}/800/800.webp 800w, https://i.picsum.photos/id/${image}/1000/1000.webp 1000w, https://i.picsum.photos/id/${image}/1200/1200.webp 1200w, https://i.picsum.photos/id/${image}/1400/1400.webp 1400w,https://i.picsum.photos/id/${image}/1600/1600.webp 1600w`,
              'image/jpeg': `https://i.picsum.photos/id/${image}/400/400.jpg 400w, https://i.picsum.photos/id/${image}/600/600.jpg 600w, https://i.picsum.photos/id/${image}/800/800.jpg 800w, https://i.picsum.photos/id/${image}/1000/1000.jpg 1000w, https://i.picsum.photos/id/${image}/1200/1200.jpg 1200w, https://i.picsum.photos/id/${image}/1400/1400.jpg 1400w,https://i.picsum.photos/id/${image}/1600/1600.jpg 1600w`,
            }}
            alt='This is cool'
            width={400}
            height={400}
            style={{
              width: '400px',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        )
      })}
    </>
  )
}
