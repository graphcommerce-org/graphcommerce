export const VIDEO_EXTENSIONS = new Set(['mp4', 'webm', 'ogg', 'mov', 'avi'])
export const SVG_EXTENSIONS = new Set(['svg'])

export function getExtension(filename: string): string {
  const clean = filename.split('?')[0].split('#')[0]
  const dot = clean.lastIndexOf('.')
  return dot >= 0 ? clean.slice(dot + 1).toLowerCase() : ''
}

/**
 * Storyblok encodes image dimensions in the asset URL:
 * `//a.storyblok.com/f/{space}/{width}x{height}/{hash}/{filename}`
 */
export function parseDimensions(filename: string): { width: number; height: number } | null {
  const match = filename.match(/\/(\d+)x(\d+)\//)
  if (!match) return null
  const width = Number(match[1])
  const height = Number(match[2])
  return width > 0 && height > 0 ? { width, height } : null
}

export function isVideo(filename: string): boolean {
  return VIDEO_EXTENSIONS.has(getExtension(filename))
}

export function isSvg(filename: string): boolean {
  return SVG_EXTENSIONS.has(getExtension(filename))
}
