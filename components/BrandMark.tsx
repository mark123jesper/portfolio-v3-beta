/**
 * The White Cat Dev mark, drawn as a CSS mask over `currentColor`, so one 8 KB
 * vector serves both themes. The 1100 px PNG pair it replaces cost about
 * 200 KB of downloads and two large decodes for a mark shown at 40 px.
 */
export default function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`bg-current ${className}`}
      style={{
        maskImage: 'url(/logo-mark.svg)',
        WebkitMaskImage: 'url(/logo-mark.svg)',
        maskMode: 'alpha',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}
