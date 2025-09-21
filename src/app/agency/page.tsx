'use client'

import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, Clock, Tag, Award, BookOpen, Users } from 'lucide-react'

interface Persona {
  id: string
  name: string
  title: string
  era: string
  videoSrc: string
  imageSrc: string
  bio: string
  keyContributions: string[]
  famousQuotes: string[]
  expertise: string[]
  nobel?: boolean
}

const personas: Persona[] = [
  {
    id: "richard_feynman",
    name: "Richard Feynman",
    title: "Theoretical Physicist & Nobel Laureate",
    era: "1918-1988",
    videoSrc: "/video/portraits/richard_feynman_v01_hq.mp4",
    imageSrc: "/images/portraits/richard_feynman_s01_hq.jpg",
    bio: "Brilliant physicist known for his work on quantum electrodynamics, his teaching ability, and his colorful personality. Feynman received the Nobel Prize in Physics in 1965 and was a key figure in the Manhattan Project.",
    keyContributions: [
      "Quantum Electrodynamics (QED)",
      "Feynman Diagrams",
      "Manhattan Project contributions",
      "Challenger disaster investigation",
      "Parton model of hadrons"
    ],
    famousQuotes: [
      "I would rather have questions that can't be answered than answers that can't be questioned.",
      "The first principle is that you must not fool yourself — and you are the easiest person to fool.",
      "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible."
    ],
    expertise: ["Quantum Physics", "Teaching", "Problem Solving", "Scientific Method"],
    nobel: true
  },
  {
    id: "elinor_ostrom",
    name: "Elinor Ostrom",
    title: "Political Economist & Nobel Laureate",
    era: "1933-2012",
    videoSrc: "/video/portraits/elinor_ostrom_v01_optimized.mp4",
    imageSrc: "/images/portraits/elinor_ostrom_s01_optimized.jpg",
    bio: "Groundbreaking political economist who challenged conventional wisdom about common pool resources. First woman to win the Nobel Prize in Economic Sciences for her analysis of economic governance, especially of shared resources.",
    keyContributions: [
      "Institutional Analysis and Development (IAD) framework",
      "Polycentric governance theory",
      "Common pool resource management principles",
      "Design principles for stable resource management",
      "Empirical studies of community-based resource governance"
    ],
    famousQuotes: [
      "Neither the state nor the market is uniformly successful in enabling individuals to sustain long-term, productive use of natural resource systems.",
      "What we have ignored is what citizens can do and the importance of real involvement of the people involved.",
      "Individuals frequently develop institutions for managing common pool resources without creating either private property or relying on external authorities."
    ],
    expertise: ["Institutional Economics", "Governance", "Resource Management", "Policy Analysis", "Collective Action"],
    nobel: true
  },
  {
    id: "norbert_wiener",
    name: "Norbert Wiener",
    title: "Mathematician & Cybernetics Pioneer",
    era: "1894-1964",
    videoSrc: "/video/portraits/norbert_wiener_v01_optimized.mp4",
    imageSrc: "/images/portraits/norbert_wiener_s01_optimized.jpg",
    bio: "Mathematician and philosopher who founded the field of cybernetics, the study of communication and control in living organisms and machines. His work laid the foundation for modern automation, computer science, and artificial intelligence.",
    keyContributions: [
      "Founded the field of Cybernetics",
      "Wiener process (Brownian motion mathematics)",
      "Feedback control systems theory",
      "Information theory contributions",
      "Early artificial intelligence concepts"
    ],
    famousQuotes: [
      "The future offers very little hope for those who expect that our new mechanical slaves will offer us a world in which we may rest from thinking.",
      "We have decided to call the entire field of control and communication theory, whether in the machine or in the animal, by the name Cybernetics.",
      "The best material model of a cat is another, or preferably the same, cat."
    ],
    expertise: ["Mathematics", "Cybernetics", "Control Theory", "Information Theory", "Philosophy of Technology"],
    nobel: false
  },
  {
    id: "sun_tzu",
    name: "Sun Tzu",
    title: "Military Strategist & Philosopher",
    era: "544-496 BCE",
    videoSrc: "/video/portraits/sun_tzu_v01_optimized.mp4",
    imageSrc: "/images/portraits/sun_tzu_s01_optimized.jpg",
    bio: "Ancient Chinese military strategist, philosopher, and author of 'The Art of War,' one of the most influential works on strategy and warfare. His principles extend far beyond military applications to business, politics, and life strategy.",
    keyContributions: [
      "Authored 'The Art of War'",
      "Developed principles of strategic thinking",
      "Advanced concepts of psychological warfare",
      "Emphasized intelligence and deception in strategy",
      "Influenced military doctrine for over 2,500 years"
    ],
    famousQuotes: [
      "All warfare is based on deception.",
      "The supreme excellence is to subdue the enemy without fighting.",
      "If you know the enemy and know yourself, you need not fear the result of a hundred battles.",
      "Supreme excellence consists of breaking the enemy's resistance without fighting."
    ],
    expertise: ["Military Strategy", "Philosophy", "Leadership", "Intelligence", "Tactical Planning"],
    nobel: false
  }
]

export default function AgencyPage() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePersonaClick = (persona: Persona) => {
    setSelectedPersona(persona)
    setIsDialogOpen(true)
  }

  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {/* Persona Grid */}
          <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-5">
            {personas.map((persona) => (
              <div
                key={persona.id}
                onClick={() => handlePersonaClick(persona)}
                className="group relative bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 aspect-square rounded-xl hover:from-neutral-100 hover:to-neutral-200 dark:hover:from-neutral-700 dark:hover:to-neutral-800 transition-all duration-300 cursor-pointer border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-lg overflow-hidden"
              >
                {/* Video Background */}
                <video
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={persona.imageSrc}
                >
                  <source src={persona.videoSrc} type="video/mp4" />
                </video>

                {/* Mobile overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl md:hidden" />

                {/* Mobile content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:hidden">
                  <div className="flex items-center gap-2 mb-1">
                    {persona.nobel && (
                      <Award className="w-3 h-3 text-yellow-400" />
                    )}
                    <span className="text-xs font-medium opacity-90">{persona.era}</span>
                  </div>
                  <h3 className="font-bold text-sm leading-tight mb-1">
                    {persona.name}
                  </h3>
                  <p className="text-xs opacity-80 leading-tight">
                    {persona.title}
                  </p>
                </div>

                {/* Desktop: Name only on hover */}
                <div className="hidden md:block absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="font-bold text-lg text-white">
                        {persona.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            ))}

            {/* Empty slots for future personas */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="bg-gray-100 dark:bg-neutral-800 aspect-square rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center"
              >
                <span className="text-neutral-400 dark:text-neutral-500 text-sm">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Persona Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPersona && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={selectedPersona.imageSrc}
                    >
                      <source src={selectedPersona.videoSrc} type="video/mp4" />
                    </video>
                  </div>

                  {/* Header Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <DialogTitle className="text-2xl font-bold">
                        {selectedPersona.name}
                      </DialogTitle>
                      {selectedPersona.nobel && (
                        <Award className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <DialogDescription className="text-lg font-medium mb-2">
                      {selectedPersona.title}
                    </DialogDescription>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <Calendar className="w-4 h-4" />
                      {selectedPersona.era}
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Biography */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Biography
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {selectedPersona.bio}
                  </p>
                </div>

                {/* Key Contributions */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Key Contributions
                  </h3>
                  <ul className="space-y-2">
                    {selectedPersona.keyContributions.map((contribution, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-neutral-700 dark:text-neutral-300">{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Famous Quotes */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Famous Quotes</h3>
                  <div className="space-y-3">
                    {selectedPersona.famousQuotes.map((quote, index) => (
                      <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic text-neutral-700 dark:text-neutral-300">
                        "{quote}"
                      </blockquote>
                    ))}
                  </div>
                </div>

                {/* Expertise Tags */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPersona.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}