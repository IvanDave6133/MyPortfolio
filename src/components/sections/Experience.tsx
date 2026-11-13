
import { experiences } from '../../data/experience'

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-spacing section-divider"
    >
      <div className="container-custom">
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#345B80]">
            Professional Journey
          </p>
          <h2>Experience</h2>
        </div>

        <div className="max-w-4xl border-l-2 border-[#D5D9DE]">
          {experiences.map((item) => (
            <article
              key={item.id}
              className="relative pb-12 pl-8 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-2 h-3 w-3 rounded-full border-2 border-[#345B80] bg-[#F7F7F5]"
              />

              <p className="mb-2 text-sm text-[#6485A5]">
                {item.period}
              </p>

              <h3 className="mb-1">{item.role}</h3>

              <p className="mb-4 font-medium text-[#345B80]">
                {item.organization}
              </p>

              <p className="mb-4 text-[#515A65]">
                {item.description}
              </p>

              <ul className="list-disc space-y-2 pl-5 text-[#515A65]">
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
