import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Filter, Calendar, Clock, Tag, User, Users } from 'lucide-react'

const demoData = [
  {
    id: "1",
    title: "A Treatise on Consciousness Adaptation",
    author: "Richard Feynman",
    type: "monologue",
    date: "2024-09-20",
    readingTime: "8 min",
    tags: ["consciousness", "physics", "adaptation"]
  },
  {
    id: "2",
    title: "Cybernetic Governance of the Commons",
    author: "Elinor Ostrom & Norbert Wiener",
    type: "dialogue",
    date: "2024-09-20",
    readingTime: "12 min",
    tags: ["governance", "cybernetics", "commons"]
  },
  // Add more demo entries...
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 3}`,
    title: `Sample Article ${i + 3}`,
    author: `Author ${i + 3}`,
    type: i % 2 === 0 ? "monologue" : "dialogue",
    date: "2024-09-20",
    readingTime: `${Math.floor(Math.random() * 20) + 5} min`,
    tags: ["sample", "demo", "placeholder"]
  }))
]

export default function ExplorePage() {
  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-visible md:overflow-hidden min-h-screen md:h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-auto md:h-full md:overflow-y-auto overflow-visible">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Explore
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Search and filter through our knowledge library
            </p>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by title, author, or tags..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-neutral-200 dark:border-neutral-700">
                  <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100">Title</TableHead>
                  <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100">Author</TableHead>
                  <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100">Type</TableHead>
                  <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100">Date</TableHead>
                  <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100">Reading Time</TableHead>
                  <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100">Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 cursor-pointer transition-colors"
                  >
                    <TableCell className="font-medium text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </TableCell>
                    <TableCell className="text-neutral-700 dark:text-neutral-300">
                      <div className="flex items-center gap-2">
                        {item.type === "dialogue" ? (
                          <Users className="h-3 w-3" />
                        ) : (
                          <User className="h-3 w-3" />
                        )}
                        {item.author}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        item.type === "dialogue"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      )}>
                        {item.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-neutral-700 dark:text-neutral-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </TableCell>
                    <TableCell className="text-neutral-700 dark:text-neutral-300">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {item.readingTime}
                      </div>
                    </TableCell>
                    <TableCell className="text-neutral-700 dark:text-neutral-300">
                      <div className="flex items-center gap-2">
                        <Tag className="h-3 w-3" />
                        <span className="truncate">{item.tags.slice(0, 2).join(', ')}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Bottom padding */}
          <div className="h-16 md:h-20"></div>
        </div>
      </div>
    </div>
  )
}