'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects, timeline } from '@/lib/projects'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
            Pranav Kumaar Sridhar
          </h1>
          <p className="text-2xl md:text-3xl text-medium-gray mb-8 font-light">
            Software Engineer & AI/ML Developer
          </p>
          <p className="text-xl md:text-2xl text-medium-gray mb-12 max-w-3xl leading-relaxed">
            Building intelligent systems at the intersection of enterprise software, machine learning, and healthcare technology.
            Currently engineering secure interoperability solutions at <span className="text-medium-dark font-medium">Baxter International</span>.
          </p>

          {/* Social Links */}
          <div className="flex gap-6 text-lg">
            <a
              href="mailto:pranavkumaar.in@gmail.com"
              className="text-medium-dark hover:text-medium-green transition-colors no-underline"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/pranavkumaarofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-medium-dark hover:text-medium-green transition-colors no-underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/pranavkumaarofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-medium-dark hover:text-medium-green transition-colors no-underline"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-medium-light">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold mb-16 text-center"
          >
            Experience & Projects
          </motion.h2>

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-medium-border"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-medium-dark rounded-full" />

                {/* Content */}
                <div className="mb-2">
                  <span className="text-sm text-medium-gray font-medium tracking-wide uppercase">
                    {item.year}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                  {item.title}
                </h3>

                <p className="text-xl text-medium-gray mb-2">
                  {item.company} · {item.location}
                </p>

                <p className="text-lg text-medium-gray mb-6">
                  {item.description}
                </p>

                {/* Associated Projects */}
                <div className="space-y-4">
                  {item.projects.map((projectId) => {
                    const project = projects.find((p) => p.id === projectId)
                    if (!project) return null

                    return (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="block p-6 bg-white rounded-lg border border-medium-border hover:border-medium-dark transition-all no-underline group"
                      >
                        <h4 className="text-xl font-serif font-bold mb-2 group-hover:text-medium-green transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-medium-gray mb-3">
                          {project.subtitle}
                        </p>
                        <p className="text-base leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-medium-light text-sm text-medium-gray rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-medium-gray">
        <p className="text-base">
          © {new Date().getFullYear()} Pranav Kumaar Sridhar. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
