import React from 'react'
import { FilestackPicture } from '.'

export default {
  title: 'components|FilestackPicture',
}

export const jpg = () => (
  <FilestackPicture
    src='https://media.graphcms.com/AH7BSbZQRhm2JED720qf'
    type='image/jpeg'
    alt='img'
    width={396} // Rendere width of image on Nexus5X
    height={205}
    style={{
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 1px 8px 0px, rgba(0, 0, 0, 0.04) 0px 3px 4px 0px, rgba(0, 0, 0, 0.02) 0px 3px 3px -2px',
    }}
  />
)

export const jpgToLossless = () => (
  <FilestackPicture
    src='https://media.graphcms.com/AH7BSbZQRhm2JED720qf'
    type='image/jpeg'
    compression='lossless'
    alt='img'
    width={396} // Rendere width of image on Nexus5X
    height={205}
    style={{
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 1px 8px 0px, rgba(0, 0, 0, 0.04) 0px 3px 4px 0px, rgba(0, 0, 0, 0.02) 0px 3px 3px -2px',
    }}
  />
)

export const png = () => (
  <FilestackPicture
    src='https://media.graphcms.com/iw1awANXTXqcYbSIpYF0'
    type='image/png'
    alt='img'
    width={396} // Rendere width of image on Nexus5X
    height={205}
    style={{
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 1px 8px 0px, rgba(0, 0, 0, 0.04) 0px 3px 4px 0px, rgba(0, 0, 0, 0.02) 0px 3px 3px -2px',
    }}
  />
)

export const pngToLossy = () => (
  <FilestackPicture
    src='https://media.graphcms.com/iw1awANXTXqcYbSIpYF0'
    type='image/png'
    compression='lossy'
    alt='img'
    width={396} // Rendere width of image on Nexus5X
    height={205}
    style={{
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 1px 8px 0px, rgba(0, 0, 0, 0.04) 0px 3px 4px 0px, rgba(0, 0, 0, 0.02) 0px 3px 3px -2px',
    }}
  />
)

export const svg = () => (
  <FilestackPicture
    src='https://media.graphcms.com/qVbVddtgQVq8uIWD9Myw'
    type='image/svg+xml'
    alt='img'
    width={396} // Rendere width of image on Nexus5X
    height={205}
    style={{
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 1px 8px 0px, rgba(0, 0, 0, 0.04) 0px 3px 4px 0px, rgba(0, 0, 0, 0.02) 0px 3px 3px -2px',
    }}
  />
)

export const gif = () => (
  <FilestackPicture
    src='https://media.graphcms.com/kcDVNo7SS7iRhh05SgPh'
    type='image/gif'
    alt='img'
    width={396} // Rendere width of image on Nexus5X
    height={205}
    style={{
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 1px 8px 0px, rgba(0, 0, 0, 0.04) 0px 3px 4px 0px, rgba(0, 0, 0, 0.02) 0px 3px 3px -2px',
    }}
  />
)
