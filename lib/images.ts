import { imageSizes } from '@/lib/image-sizes'

/** Intrinsic size of a public image, recorded by `npm run images`. */
export const sizeOf = (src: string): [number, number] => imageSizes[src] ?? [1440, 900]

const webp = (src: string, width: number) => src.replace(/\.(jpe?g|png)$/i, `-${width}.webp`)

/** WebP candidates from `npm run images`; the JPEG stays as the fallback. */
export const webpSrcSet = (src: string) => {
  const [width] = sizeOf(src)
  if (width <= 720) return `${webp(src, width)} ${width}w`
  return `${webp(src, 720)} 720w, ${webp(src, width)} ${width}w`
}
