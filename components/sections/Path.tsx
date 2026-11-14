import { Reveal, SectionLabel } from '@/components/ui'
import { education, experience } from '@/lib/site'

export default function Path() {
  return (
    <section id="path" className="scroll-mt-24 border-b border-line">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel index="04">Path</SectionLabel>
              <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
                A slightly sideways route into software.
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="border-t border-line">
              {experience.map((job, index) => (
                <Reveal key={`${job.company}-${job.period}`} delay={index * 0.04}>
                  <div className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-6">
                    <p className="label pt-1 text-muted md:col-span-3">{job.period}</p>
                    <div className="md:col-span-9">
                      <h3 className="font-display text-2xl leading-tight text-ink">{job.role}</h3>
                      <p className="mt-1 text-sm text-accent">{job.company}</p>
                      <p className="mt-1 text-xs text-muted">{job.location}</p>
                      <ul className="mt-4 space-y-2">
                        {job.points.map((point) => (
                          <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h3 className="label mt-14 text-muted">Education</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {education.map((item) => (
                  <div key={`${item.title}-${item.period}`} className="rounded-2xl border border-line p-5">
                    <p className="label text-muted">{item.period}</p>
                    <h4 className="mt-3 text-sm font-medium leading-snug text-ink">{item.title}</h4>
                    <p className="mt-1.5 text-sm text-muted">{item.school}</p>
                    <p className="mt-1 text-xs text-muted/70">{item.location}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
