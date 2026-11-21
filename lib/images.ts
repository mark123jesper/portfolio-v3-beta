import { imageColors } from '@/lib/image-colors'
import { imageSizes } from '@/lib/image-sizes'

/** Intrinsic size of a public image, recorded by `npm run images`. */
export const sizeOf = (src: string): [number, number] => imageSizes[src] ?? [1440, 900]

/** Average colour of a public image, painted behind it while it loads. */
export const colorOf = (src: string): string => imageColors[src] ?? 'var(--surface)'

/** Candidates from `npm run images`; the JPEG stays as the fallback. */
const srcSet = (src: string, extension: string) => {
  const [width] = sizeOf(src)
  const variant = (candidate: number) => src.replace(/\.(jpe?g|png)$/i, `-${candidate}.${extension}`)
  if (width <= 720) return `${variant(width)} ${width}w`
  return `${variant(720)} 720w, ${variant(width)} ${width}w`
}

/** AVIF first in the markup: roughly a third smaller than the WebP files. */
export const avifSrcSet = (src: string) => srcSet(src, 'avif')

/** WebP for browsers without AVIF. */
export const webpSrcSet = (src: string) => srcSet(src, 'webp')
