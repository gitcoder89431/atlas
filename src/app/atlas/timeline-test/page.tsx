import { AppSidebar } from '@/components/app-sidebar'
import { Timeline } from '@/components/ui/timeline'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

export default function TimelineTestPage() {
  const data = [
    {
      title: "Elinor Ostrom - The Challenge of Institutional Legibility",
      content: (
        <div>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">EO</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Elinor Ostrom</h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                Nobel Prize-winning economist, expert on common pool resources
              </p>
              <div className="text-neutral-700 dark:text-neutral-300">
                <p className="mb-3">
                  In my extensive research on common pool resources, I've observed that excessive legibility—making every aspect of an institution visible and measurable—paradoxically destroys the very adaptive capacity that allows communities to thrive.
                </p>
                <p className="mb-3">
                  Consider the irrigation systems I studied in the Philippines or the forest management cooperatives in Nepal. When external authorities demanded complete transparency and standardized procedures, these institutions lost their ability to respond flexibly to local conditions.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-900 dark:text-blue-100">Key Insight:</p>
                  <p className="text-blue-800 dark:text-blue-200">
                    We must treat legibility and autonomy as "conjugate variables" in institutional design—you cannot maximize both transparency and flexibility simultaneously.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Norbert Wiener - The Cybernetic Response",
      content: (
        <div>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm">NW</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Norbert Wiener</h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                Mathematician, founder of cybernetics
              </p>
              <div className="text-neutral-700 dark:text-neutral-300">
                <p className="mb-3">
                  As the founder of cybernetics, I see institutional design as fundamentally a problem of feedback loops and information processing.
                </p>
                <p className="mb-3">
                  The key insight from control theory is that effective governance requires coupling monitoring, sanctioning, and benefit-sharing into a closed-loop system. But the incentive gains must be designed to be sub-critical to prevent oscillatory exploitation.
                </p>
                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="font-semibold text-green-900 dark:text-green-100">Bridge Concept:</p>
                  <p className="text-green-800 dark:text-green-200">
                    institutional_design × control_theory
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Elinor Ostrom - Finding the Sweet Spot",
      content: (
        <div>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">EO</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Elinor Ostrom</h4>
              <div className="text-neutral-700 dark:text-neutral-300">
                <p className="mb-3">
                  This cybernetic perspective beautifully complements my observations about polycentric governance. Polycentric designs—systems with multiple, semi-autonomous centers of authority—consistently reduced the variance of resource levels under external shocks.
                </p>
                <p className="mb-3">
                  Each center has detailed knowledge of its local domain but only general awareness of other centers' operations. This creates "bounded discretion"—enough local autonomy to adapt, enough transparency to coordinate.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-900 dark:text-blue-100">Key Finding:</p>
                  <p className="text-blue-800 dark:text-blue-200">
                    Stability emerges from dynamic balance between transparency and autonomy across different scales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Synthesis - The Emerging Truth",
      content: (
        <div>
          <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">The Emerging Truth</h4>
            <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-4">
              The conversation reveals a deeper truth: effective governance emerges not from perfect design, but from the continuous calibration of transparency and autonomy in response to changing conditions.
            </p>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg">
              <p className="font-semibold text-purple-900 dark:text-purple-100">Convergence:</p>
              <p className="text-purple-800 dark:text-purple-200">
                Both speakers agree that institutional design requires balancing competing forces—legibility vs. autonomy, control vs. adaptation—rather than optimizing for any single variable.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
          {/* Back Button */}
          <Link
            href="/atlas"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Atlas
          </Link>

          {/* Custom Header */}
          <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
            <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
              Cybernetic Governance of the Commons: A Dialogue
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
              A conversation between Elinor Ostrom and Norbert Wiener on balancing transparency and autonomy in institutional design
            </p>
          </div>

          {/* Timeline */}
          <Timeline data={data} />
        </div>
      </div>
    </div>
  )
}