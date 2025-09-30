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
    id: 'ada-lovelace-poetical-science-2025',
    title: 'Ada Lovelace: Poetical Science and Universal Computation',
    description:
      'Fifteen-minute deep dive: How Ada Lovelace\'s revolutionary "poetical science" methodology—weaving analytical rigor with imaginative insight—led her to envision the Analytical Engine as a universal symbol manipulator capable of acting upon "other things besides number," anticipating modern computing through algorithmic loops and conditional branching.',
    date: '2025-09-30',
    duration: '15:17',
    audioSrc: '/podcasts/ada-lovelace-poetical-science-computation-2025-09-30.mp3',
    topics: ['Ada Lovelace', 'Poetical Science', 'Universal Computation', 'Analytical Engine', 'Programming', 'Mathematical Imagination'],
  },
  {
    id: 'ibn-sina-unified-theory-2025',
    title: 'Ibn Sina\'s Unified Theory: How Four Causes and Logic Mapped Reality',
    description:
      'Eighteen-minute deep dive: How Ibn Sina\'s rigorous rational method—requiring knowledge of all four causes (material, efficient, formal, final) plus systematic logic to guard against reasoning errors—created the foundational framework linking metaphysical proofs to clinical observation and the structure of existence itself.',
    date: '2025-09-30',
    duration: '18:02',
    audioSrc: '/podcasts/ibn-sina-unified-theory-review-2025-09-30.mp3',
    topics: ['Ibn Sina', 'Four Causes', 'Aristotelian Logic', 'Medieval Philosophy', 'Systematic Thinking', 'Metaphysics'],
  },
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
