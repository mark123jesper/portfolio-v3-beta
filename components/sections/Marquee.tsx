import { marqueeWords } from '@/lib/site'

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line py-4" aria-hidden>
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center">
            {marqueeWords.map((word) => (
              <span key={word} className="flex items-center">
                <span className="label px-6 text-muted">{word}</span>
                <span className="h-1 w-1 rounded-full bg-accent/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
