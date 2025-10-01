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
    id: 'leonardo-unified-blueprint-2025',
    title: 'Leonardo\'s Blueprint: Decoding the Unified System of Art and Science',
    description:
      'Fourteen-minute deep dive: How Leonardo da Vinci engineered a unified discovery system treating art and science as complementary ways of understanding reality—using integrated observation through drawing, systematic documentation to fight bias, and analogical reasoning to transfer universal principles like flow dynamics across anatomy, hydraulics, and engineering.',
    date: '2025-10-01',
    duration: '14:26',
    audioSrc: '/podcasts/leonardo-unified-blueprint-art-science-2025-10-01.mp3',
    topics: ['Leonardo da Vinci', 'Unified System', 'Art and Science', 'Integrated Observation', 'Analogical Reasoning', 'Renaissance Method'],
  },
  {
    id: 'marie-curie-systematic-method-2025',
    title: 'Marie Curie\'s Secret: The Systematic Method That Found the Unfindable',
    description:
      'Sixteen-minute deep dive: How Marie Curie\'s revolutionary systematic experimental methodology—combining quantitative precision with extraordinary persistence—recognized radioactivity as an atomic property and invented radiochemical analysis, where the electrometer guided chemical separations to detect substances invisible to traditional analysis.',
    date: '2025-10-01',
    duration: '16:34',
    audioSrc: '/podcasts/marie-curie-systematic-method-unfindable-2025-10-01.mp3',
    topics: ['Marie Curie', 'Systematic Methodology', 'Radiochemical Analysis', 'Atomic Properties', 'Experimental Physics', 'Scientific Method'],
  },
  {
    id: 'hypatia-alexandrian-synthesis-2025',
    title: 'Hypatia\'s Alexandrian Synthesis: How Math Became the Bedrock of Philosophical Authority',
    description:
      'Fifteen-minute deep dive: How Hypatia of Alexandria unified philosophical wisdom with mathematical rigor through her "contemplative rationalism"—where mathematical proofs provided intellectual discipline for deeper insight, while precision instruments like the hydrometer demonstrated practical competence that commanded cross-sectarian authority in a divided city.',
    date: '2025-10-01',
    duration: '14:51',
    audioSrc: '/podcasts/hypatia-alexandrian-synthesis-math-bedrock-2025-10-01.mp3',
    topics: ['Hypatia', 'Alexandrian Synthesis', 'Mathematical Philosophy', 'Contemplative Rationalism', 'Classical Antiquity', 'Cross-Sectarian Authority'],
  },
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
