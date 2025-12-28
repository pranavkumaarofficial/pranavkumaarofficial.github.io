'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects, timeline } from '@/lib/projects'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container-custom min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl w-full"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 text-muted-foreground font-medium tracking-wide"
          >
            SOFTWARE ENGINEER & AI/ML DEVELOPER
          </motion.div>

          <h1 className="mb-6 leading-[1.1]">
            Pranav Kumaar
            <br />
            Sridhar
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl max-w-2xl mb-12"
          >
            Building intelligent systems with LLM orchestration, multi-agent architectures, and production ML infrastructure.
            {' '}
            <span className="text-foreground font-medium">Currently at Baxter International.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            <a
              href="mailto:pranavkumaar.in@gmail.com"
              className="group flex items-center gap-2 text-foreground hover:text-accent font-medium"
            >
              <span className="text-muted-foreground group-hover:text-accent transition-colors">→</span>
              Email
            </a>
            <a
              href="https://linkedin.com/in/pranavkumaarofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-foreground hover:text-accent font-medium"
            >
              <span className="text-muted-foreground group-hover:text-accent transition-colors">→</span>
              LinkedIn
            </a>
            <a
              href="https://github.com/pranavkumaarofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-foreground hover:text-accent font-medium"
            >
              <span className="text-muted-foreground group-hover:text-accent transition-colors">→</span>
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Work Section */}
      <section className="container-custom section-padding border-t border-border">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-16">Selected Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.filter(p => p.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="group block p-8 border border-border hover:border-accent rounded-lg transition-all duration-300 hover-lift bg-background"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <svg
                      className="w-6 h-6 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {project.subtitle}
                  </p>

                  <p className="mb-6 text-foreground">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-md font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="container-custom section-padding border-t border-border">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-16">Experience</h2>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-border last:border-0"
              >
                <div className="md:col-span-1">
                  <div className="text-sm font-mono text-muted-foreground mb-2">
                    {item.year}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.location}
                  </div>
                </div>

                <div className="md:col-span-3">
                  <h3 className="mb-2">{item.title}</h3>
                  <div className="text-lg font-medium text-accent mb-3">
                    {item.company}
                  </div>
                  <p className="mb-4">{item.description}</p>

                  {item.projects && item.projects.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.projects.map((projectId) => {
                        const project = projects.find((p) => p.id === projectId)
                        if (!project) return null

                        return (
                          <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="text-sm text-foreground hover:text-accent underline underline-offset-4 transition-colors"
                          >
                            {project.title}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container-custom py-12 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Pranav Kumaar Sridhar
          </div>
          <div className="flex gap-6">
            <a href="mailto:pranavkumaar.in@gmail.com" className="hover:text-foreground transition-colors">
              Email
            </a>
            <a href="https://linkedin.com/in/pranavkumaarofficial" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/pranavkumaarofficial" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
