import { Reveal, SectionLabel } from '@/components/ui'
import { skillGroups } from '@/lib/site'

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-b border-line">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel index="03">Toolkit</SectionLabel>
              <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
                The tools I reach for.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                A working toolkit rather than a checklist — everything here has shipped in a project at some point.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-x-10 gap-y-10 md:col-span-8 sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.05}>
                <div className="border-t border-line pt-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-xl text-ink">{group.title}</h3>
                    <span className="label text-muted">{String(group.items.length).padStart(2, '0')}</span>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-muted transition-colors hover:border-accent hover:text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
