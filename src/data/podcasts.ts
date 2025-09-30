export interface PodcastEpisode {
  id: string
  title: string
  description: string
  date: string
  duration: string
  audioSrc: string
  topics: string[]
}

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: '2025-week-02',
    title: 'Mathematical Method as Universal Architecture',
    description:
      'Fifteen-minute deep dive: How Lovelace, Turing, and Shannon reveal mathematical method as a foundational blueprint for reliable knowledge—where precise definitions act as logical gates, axioms set channel capacity, and rigorous thinking operates as error-correcting code across noisy cognitive channels.',
    date: '2025-09-30',
    duration: '15:56',
    audioSrc: '/podcasts/mathematical-method-universal-architecture-2025-09-30.mp3',
    topics: ['Mathematical Method', 'Computational Architecture', 'Information Theory', 'Cognitive Science', 'Universal Principles'],
  },
  {
    id: '2025-week-01',
    title: 'Weekly Atlas Signals — September 27, 2025',
    description:
      'Sixteen-minute signal: the week’s dialogues on modular manifolds, evolutionary meta-learning, and cybernetic governance compressed into one take—why geometric seams, aesthetic structure, and adaptive feedback still decide what survives.',
    date: '2025-09-27',
    duration: '16:53',
    audioSrc: '/podcasts/weekly-atlas-2025-09-28.mp3',
    topics: [],
  },
]
