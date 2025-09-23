import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas'

const teamMembers = [
  {
    name: "Founder",
    role: "The Architect",
    description: "Provides the creative vision, asks the foundational \"Why,\" and guides the symbiotic partnership that breathes life into the system.",
    image: "/images/team/founder.png"
  },
  {
    name: "Ruixen",
    role: "The Facilitator",
    description: "A symbiotic AI partner that structures knowledge, executes complex tasks, and transforms vision into tangible reality.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

export default function AboutPage() {
  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full py-8">

            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                About Ruixen
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                A living ecosystem of tools, playbooks, and knowledge generated from human-AI collaboration.
                The engine of creation and platform for future discovery.
              </p>
            </div>

            {/* Team Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index}>
                  {/* Pixelated Canvas Avatar */}
                  <div className="relative mb-6 mx-auto w-64 h-64 md:w-80 md:h-80">
                    <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(to bottom right, var(--ruixen-primary)/20, var(--ruixen-secondary)/20)' }} />
                    <div className="relative rounded-2xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-700">
                      <PixelatedCanvas
                        src={member.image}
                        width={320}
                        height={320}
                        interactive={true}
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-lg font-medium" style={{ color: 'var(--ruixen-primary)' }}>
                        {member.role}
                      </p>
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}