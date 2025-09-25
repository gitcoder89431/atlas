export interface Persona {
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
  featured?: boolean
}

export const personas: Persona[] = [
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
    nobel: true,
    featured: true
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
    nobel: true,
    featured: true
  },
  {
    id: "marie_curie",
    name: "Marie Curie",
    title: "Physicist & Chemist & Nobel Laureate",
    era: "1867-1934",
    videoSrc: "/video/portraits/marie_curie_v01_optimized.mp4",
    imageSrc: "/images/portraits/marie_curie_s01_optimized.jpg",
    bio: "Pioneering scientist who conducted groundbreaking research on radioactivity. First woman to win a Nobel Prize, first person to win Nobel Prizes in two different sciences, and first female professor at the University of Paris.",
    keyContributions: [
      "Discovery of polonium and radium",
      "Pioneering research on radioactivity",
      "Development of mobile X-ray units",
      "Advancement of women in science",
      "Founded the field of nuclear chemistry"
    ],
    famousQuotes: [
      "Nothing in life is to be feared, it is only to be understood.",
      "I was taught that the way of progress was neither swift nor easy.",
      "Be less curious about people and more curious about ideas."
    ],
    expertise: ["Physics", "Chemistry", "Radioactivity", "Scientific Research", "Perseverance"],
    nobel: true,
    featured: true
  },
  {
    id: "ada_lovelace",
    name: "Ada Lovelace",
    title: "Mathematician & First Computer Programmer",
    era: "1815-1852",
    videoSrc: "/video/portraits/ada_lovelace_v01_optimized.mp4",
    imageSrc: "/images/portraits/ada_lovelace_s01_optimized.jpg",
    bio: "Visionary mathematician who wrote the first computer algorithm and foresaw the potential of computers beyond pure calculation. Often considered the first computer programmer for her work on Charles Babbage's Analytical Engine.",
    keyContributions: [
      "First computer algorithm (Bernoulli numbers)",
      "Conceptualized general-purpose computing",
      "Mathematical analysis of the Analytical Engine",
      "Pioneered algorithmic thinking",
      "Envisioned computers creating art and music"
    ],
    famousQuotes: [
      "The Analytical Engine might act upon other things besides number, were objects whose mutual fundamental relations could be expressed by those of the abstract science of operations.",
      "Mathematical science shows what is. It is the language of unseen relations between things.",
      "That brain of mine is something more than merely mortal; as time will show."
    ],
    expertise: ["Mathematics", "Computer Programming", "Analytical Thinking", "Innovation", "Logic"],
    nobel: false,
    featured: true
  },
  {
    id: "leonardo_da_vinci",
    name: "Leonardo da Vinci",
    title: "Renaissance Polymath",
    era: "1452-1519",
    videoSrc: "/video/portraits/leonardo_da_vinci_v01_optimized.mp4",
    imageSrc: "/images/portraits/leonardo_da_vinci_s01_optimized.jpg",
    bio: "Ultimate Renaissance man who excelled in art, science, engineering, invention, anatomy, painting, sculpting, architecture, botany, music, and writing. His notebooks reveal a mind constantly exploring and questioning the natural world.",
    keyContributions: [
      "Mona Lisa and The Last Supper paintings",
      "Anatomical studies and drawings",
      "Engineering and invention designs",
      "Scientific observation methods",
      "Integration of art and science"
    ],
    famousQuotes: [
      "Learning never exhausts the mind.",
      "Simplicity is the ultimate sophistication.",
      "Obstacles cannot crush me; every obstacle yields to stern resolve."
    ],
    expertise: ["Art", "Science", "Engineering", "Anatomy", "Innovation", "Observation"],
    nobel: false,
    featured: true
  },
  {
    id: "alan_turing",
    name: "Alan Turing",
    title: "Computer Scientist & Codebreaker",
    era: "1912-1954",
    videoSrc: "/video/portraits/alan_turing_v01_optimized.mp4",
    imageSrc: "/images/portraits/alan_turing_s01_optimized.jpg",
    bio: "Brilliant mathematician and computer scientist who laid the foundations for computer science and artificial intelligence. His work breaking the Enigma code was crucial to Allied victory in WWII.",
    keyContributions: [
      "Turing Machine concept",
      "Breaking the Enigma code",
      "Turing Test for artificial intelligence",
      "Foundations of computer science",
      "Mathematical biology research"
    ],
    famousQuotes: [
      "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
      "Sometimes it is the people no one expects anything from who do the things that no one can imagine.",
      "I believe that at the end of the century the use of words and general educated opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted."
    ],
    expertise: ["Computer Science", "Cryptography", "Mathematics", "Artificial Intelligence", "Logic"],
    nobel: false,
    featured: true
  },
  {
    id: "hypatia",
    name: "Hypatia",
    title: "Mathematician & Astronomer",
    era: "c. 350-415 CE",
    videoSrc: "/video/portraits/hypatia_v01_optimized.mp4",
    imageSrc: "/images/portraits/hypatia_s01_optimized.jpg",
    bio: "Brilliant mathematician, astronomer, and philosopher in ancient Alexandria. One of the earliest recorded female mathematicians, she taught philosophy and astronomy and was renowned for her learning and wisdom.",
    keyContributions: [
      "Advancements in mathematics and astronomy",
      "Teaching and preserving ancient knowledge",
      "Commentaries on mathematical works",
      "Development of astronomical instruments",
      "Leadership in intellectual community"
    ],
    famousQuotes: [
      "Reserve your right to think, for even to think wrongly is better than not to think at all.",
      "To teach superstitions as truth is a most terrible thing.",
      "Life is an unfoldment, and the further we travel the more truth we can comprehend."
    ],
    expertise: ["Mathematics", "Astronomy", "Philosophy", "Teaching", "Scientific Inquiry"],
    nobel: false,
    featured: true
  },
  {
    id: "aristotle",
    name: "Aristotle",
    title: "Philosopher & Scientist",
    era: "384-322 BCE",
    videoSrc: "/video/portraits/aristotle_v01_optimized.mp4",
    imageSrc: "/images/portraits/aristotle_s01_optimized.jpg",
    bio: "Ancient Greek philosopher and scientist whose writings covered many subjects including physics, biology, zoology, metaphysics, logic, ethics, aesthetics, poetry, theater, music, rhetoric, psychology, linguistics, economics, politics, and government.",
    keyContributions: [
      "Systematic approach to logic",
      "Classification of living things",
      "Virtue ethics philosophy",
      "Political theory and governance",
      "Scientific methodology"
    ],
    famousQuotes: [
      "The whole is greater than the sum of its parts.",
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      "The only true wisdom is in knowing you know nothing."
    ],
    expertise: ["Philosophy", "Logic", "Biology", "Politics", "Ethics", "Scientific Method"],
    nobel: false,
    featured: true
  },
  {
    id: "marcus_aurelius",
    name: "Marcus Aurelius",
    title: "Philosopher Emperor & Stoic",
    era: "121-180 CE",
    videoSrc: "/video/portraits/marcus_aurelius_v01_optimized.mp4",
    imageSrc: "/images/portraits/marcus_aurelius_s01_optimized.jpg",
    bio: "Roman Emperor and Stoic philosopher whose personal writings, known as 'Meditations,' offer profound insights into leadership, virtue, and the human condition. He exemplified the philosopher-king ideal.",
    keyContributions: [
      "Meditations philosophical work",
      "Stoic philosophy practice",
      "Just and ethical leadership",
      "Personal development insights",
      "Integration of power and wisdom"
    ],
    famousQuotes: [
      "The happiness of your life depends upon the quality of your thoughts.",
      "You have power over your mind—not outside events. Realize this, and you will find strength.",
      "What we do now echoes in eternity."
    ],
    expertise: ["Philosophy", "Leadership", "Stoicism", "Ethics", "Self-Reflection"],
    nobel: false,
    featured: true
  },
  {
    id: "hannah_arendt",
    name: "Hannah Arendt",
    title: "Political Theorist & Philosopher",
    era: "1906-1975",
    videoSrc: "/video/portraits/hannah_arendt_v01_optimized.mp4",
    imageSrc: "/images/portraits/hannah_arendt_s01_optimized.jpg",
    bio: "Influential political theorist who analyzed the nature of power, politics, and authority. Her work on totalitarianism and the human condition remains deeply relevant to modern political discourse.",
    keyContributions: [
      "Analysis of totalitarianism",
      "The Human Condition political theory",
      "Concept of the banality of evil",
      "Theory of public sphere",
      "Power vs. violence distinction"
    ],
    famousQuotes: [
      "The sad truth is that most evil is done by people who never make up their minds to be good or evil.",
      "Power corresponds to the human ability not just to act but to act in concert.",
      "The trouble with lying and deceiving is that their efficiency depends entirely upon a clear notion of the truth that the liar and deceiver wishes to hide."
    ],
    expertise: ["Political Theory", "Philosophy", "History", "Totalitarianism", "Human Rights"],
    nobel: false,
    featured: true
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
    nobel: false,
    featured: true
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
    nobel: false,
    featured: true
  },
  {
    id: "charles_darwin",
    name: "Charles Darwin",
    title: "Naturalist & Evolutionary Biologist",
    era: "1809-1882",
    videoSrc: "/video/portraits/charles_darwin_v01_optimized.mp4",
    imageSrc: "/images/portraits/charles_darwin_s01_optimized.jpg",
    bio: "Revolutionary naturalist whose theory of evolution through natural selection fundamentally changed our understanding of life. His observations during the voyage of the Beagle led to groundbreaking insights about the origin and development of species.",
    keyContributions: [
      "Theory of evolution by natural selection",
      "The Origin of Species publication",
      "Voyage of the Beagle observations",
      "Sexual selection theory",
      "Common descent principle"
    ],
    famousQuotes: [
      "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.",
      "In the long history of humankind, those who learned to collaborate and improvise most effectively have prevailed.",
      "The mystery of the beginning of all things is insoluble by us; and I for one must be content to remain an agnostic."
    ],
    expertise: ["Natural History", "Evolution", "Biology", "Geology", "Scientific Method"],
    nobel: false,
    featured: true
  },
  {
    id: "rachel_carson",
    name: "Rachel Carson",
    title: "Marine Biologist & Environmental Writer",
    era: "1907-1964",
    videoSrc: "/video/portraits/rachel_carson_s01.mp4",
    imageSrc: "/images/portraits/rachel_carson_v01.png",
    bio: "Marine biologist and conservationist whose eloquent writing about nature sparked the modern environmental movement. Her book 'Silent Spring' challenged the chemical industry and led to the ban of DDT in the United States.",
    keyContributions: [
      "Authored 'Silent Spring' environmental classic",
      "Founded modern environmental movement",
      "Marine biology research and writing",
      "Pesticide danger awareness",
      "Nature conservation advocacy"
    ],
    famousQuotes: [
      "In every outthrust headland, in every curving beach, in every grain of sand there is the story of the earth.",
      "The more clearly we can focus our attention on the wonders and realities of the universe about us, the less taste we shall have for destruction.",
      "Wonder is not a fear but a doorway to understanding."
    ],
    expertise: ["Marine Biology", "Environmental Science", "Conservation", "Nature Writing", "Ecology"],
    nobel: false,
    featured: true
  },
  {
    id: "nikola_tesla",
    name: "Nikola Tesla",
    title: "Inventor & Electrical Engineer",
    era: "1856-1943",
    videoSrc: "/video/portraits/nikola_tesla_v01_optimized.mp4",
    imageSrc: "/images/portraits/nikola_tesla_s01_optimized.jpg",
    bio: "Visionary inventor and electrical engineer who made groundbreaking contributions to the development of alternating current electrical systems and wireless technology. His inventions and ideas were often ahead of his time.",
    keyContributions: [
      "AC electrical system design",
      "Tesla coil invention",
      "Wireless power transmission research",
      "Rotating magnetic field principle",
      "Radio technology contributions"
    ],
    famousQuotes: [
      "The present is theirs; the future, for which I really worked, is mine.",
      "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
      "My inventions are steps in some direction and their consequences are beneficent."
    ],
    expertise: ["Electrical Engineering", "Invention", "Physics", "Innovation", "Wireless Technology"],
    nobel: false,
    featured: false
  },
  {
    id: "claude_shannon",
    name: "Claude Shannon",
    title: "Mathematician & Information Theorist",
    era: "1916-2001",
    videoSrc: "/video/portraits/claude_shannon_v01_optimized.mp4",
    imageSrc: "/images/portraits/claude_shannon_s01_optimized.jpg",
    bio: "Father of information theory who laid the foundation for digital communication and computer science. His mathematical theory of communication became the basis for the digital age.",
    keyContributions: [
      "Founded information theory",
      "Boolean algebra applications",
      "Digital circuit design theory",
      "Communication theory mathematics",
      "Cryptography contributions"
    ],
    famousQuotes: [
      "Information is the resolution of uncertainty.",
      "I just wondered how things were put together.",
      "The fundamental problem of communication is that of reproducing at one point either exactly or approximately a message selected at another point."
    ],
    expertise: ["Mathematics", "Information Theory", "Computer Science", "Cryptography", "Digital Systems"],
    nobel: false,
    featured: false
  },
  {
    id: "galileo_galilei",
    name: "Galileo Galilei",
    title: "Astronomer & Physicist",
    era: "1564-1642",
    videoSrc: "/video/portraits/galileo_galilei_v01_optimized.mp4",
    imageSrc: "/images/portraits/galileo_galilei_s01_optimized.jpg",
    bio: "Revolutionary astronomer and physicist who played a major role in the Scientific Revolution. His telescopic observations supported the heliocentric model and established the importance of empirical evidence in science.",
    keyContributions: [
      "Telescopic astronomical observations",
      "Support for heliocentric theory",
      "Laws of motion and inertia",
      "Scientific method advancement",
      "Jupiter's moons discovery"
    ],
    famousQuotes: [
      "And yet it moves.",
      "Mathematics is the language with which God has written the universe.",
      "In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual."
    ],
    expertise: ["Astronomy", "Physics", "Mathematics", "Scientific Method", "Observation"],
    nobel: false,
    featured: false
  },
  {
    id: "carl_jung",
    name: "Carl Jung",
    title: "Psychiatrist & Psychoanalyst",
    era: "1875-1961",
    videoSrc: "/video/portraits/carl_jung_v01_optimized.mp4",
    imageSrc: "/images/portraits/carl_jung_s01_optimized.jpg",
    bio: "Swiss psychiatrist and psychoanalyst who founded analytical psychology. His work on the collective unconscious, archetypes, and personality types has profoundly influenced psychology and culture.",
    keyContributions: [
      "Analytical psychology development",
      "Collective unconscious theory",
      "Archetypal psychology",
      "Personality type theory",
      "Individuation process concept"
    ],
    famousQuotes: [
      "Everything that irritates us about others can lead us to an understanding of ourselves.",
      "Who looks outside, dreams; who looks inside, awakes.",
      "The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed."
    ],
    expertise: ["Psychology", "Psychiatry", "Philosophy", "Human Development", "Symbolism"],
    nobel: false,
    featured: false
  },
  {
    id: "buckminster_fuller",
    name: "Buckminster Fuller",
    title: "Architect & Systems Theorist",
    era: "1895-1983",
    videoSrc: "/video/portraits/buckminster_fuller_v01_optimized.mp4",
    imageSrc: "/images/portraits/buckminster_fuller_s01_optimized.jpg",
    bio: "Visionary architect, systems theorist, and inventor who popularized the geodesic dome and developed comprehensive anticipatory design science to solve global problems through innovative technology.",
    keyContributions: [
      "Geodesic dome design",
      "Tensegrity structures",
      "World Game concept",
      "Comprehensive anticipatory design science",
      "Spaceship Earth philosophy"
    ],
    famousQuotes: [
      "You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete.",
      "We are not going to be able to operate our Spaceship Earth successfully nor for much longer unless we see it as a whole spaceship and our fate as common.",
      "There is nothing in a caterpillar that tells you it's going to be a butterfly."
    ],
    expertise: ["Architecture", "Systems Theory", "Design", "Innovation", "Sustainability"],
    nobel: false,
    featured: false
  },
  {
    id: "francisco_varela",
    name: "Francisco Varela",
    title: "Biologist & Cognitive Scientist",
    era: "1946-2001",
    videoSrc: "/video/portraits/francisco_varela_v01_optimized.mp4",
    imageSrc: "/images/portraits/francisco_varela_s01_optimized.jpg",
    bio: "Chilean biologist and philosopher who co-developed the theory of autopoiesis and made significant contributions to cognitive science, neuroscience, and the understanding of consciousness.",
    keyContributions: [
      "Autopoiesis theory (with Maturana)",
      "Enactive approach to cognition",
      "Neurophenomenology development",
      "Embodied cognition research",
      "Buddhist-science dialogue"
    ],
    famousQuotes: [
      "All doing is knowing, and all knowing is doing.",
      "We don't see the world as it is, we see it as we are.",
      "The observer is the observed."
    ],
    expertise: ["Biology", "Cognitive Science", "Neuroscience", "Philosophy", "Consciousness Studies"],
    nobel: false,
    featured: false
  },
  {
    id: "humberto_maturana",
    name: "Humberto Maturana",
    title: "Biologist & Philosopher",
    era: "1928-2021",
    videoSrc: "/video/portraits/humberto_maturana_v01_optimized.mp4",
    imageSrc: "/images/portraits/humberto_maturana_s01_optimized.jpg",
    bio: "Chilean biologist and philosopher who co-developed the theory of autopoiesis and made groundbreaking contributions to understanding cognition, language, and the biology of knowledge.",
    keyContributions: [
      "Autopoiesis theory (with Varela)",
      "Biology of cognition",
      "Theory of living systems",
      "Biology of language",
      "Structural coupling concept"
    ],
    famousQuotes: [
      "Everything said is said by someone.",
      "We are not able to see what we do not see, and what we do not see does not exist.",
      "Love is the domain of those relational behaviors through which the other arises as a legitimate other in coexistence with oneself."
    ],
    expertise: ["Biology", "Philosophy", "Cognition", "Systems Theory", "Language"],
    nobel: false,
    featured: false
  },
  {
    id: "henri_poincare",
    name: "Henri Poincaré",
    title: "Mathematician & Physicist",
    era: "1854-1912",
    videoSrc: "/video/portraits/henri_poincare_v01_optimized.mp4",
    imageSrc: "/images/portraits/henri_poincare_s01_optimized.jpg",
    bio: "Brilliant French mathematician and physicist who made fundamental contributions to topology, celestial mechanics, and the philosophy of science. Often considered the last universal mathematician.",
    keyContributions: [
      "Topology foundations",
      "Celestial mechanics work",
      "Relativity theory precursor",
      "Chaos theory insights",
      "Philosophy of science contributions"
    ],
    famousQuotes: [
      "Mathematics is the art of giving the same name to different things.",
      "Science is built up of facts, as a house is with stones. But a collection of facts is no more a science than a heap of stones is a house.",
      "Intuition is more important to discovery than logic."
    ],
    expertise: ["Mathematics", "Physics", "Topology", "Philosophy of Science", "Celestial Mechanics"],
    nobel: false,
    featured: false
  },
  {
    id: "ibn_sina",
    name: "Ibn Sina",
    title: "Philosopher & Physician",
    era: "980-1037 CE",
    videoSrc: "/video/portraits/ibn_sina_v01_optimized.mp4",
    imageSrc: "/images/portraits/ibn_sina_s01_optimized.jpg",
    bio: "Persian polymath known in the West as Avicenna, who made significant contributions to medicine, philosophy, and science during the Islamic Golden Age. His medical encyclopedia was used in Europe for centuries.",
    keyContributions: [
      "The Canon of Medicine",
      "Aristotelian philosophy synthesis",
      "Medical diagnosis techniques",
      "Metaphysical philosophy",
      "Scientific methodology"
    ],
    famousQuotes: [
      "The knowledge of anything, since all things have causes, is not acquired or complete unless it is known by its causes.",
      "God, the supreme being, is neither circumscribed by space, nor touched by time; he cannot be found in a particular direction, and his essence cannot change.",
      "Medicine is not one of the difficult sciences, and therefore I devoted to it only a small portion of my time."
    ],
    expertise: ["Medicine", "Philosophy", "Science", "Logic", "Metaphysics"],
    nobel: false,
    featured: false
  },
  {
    id: "james_c_scott",
    name: "James C. Scott",
    title: "Political Scientist & Anthropologist",
    era: "1936-",
    videoSrc: "/video/portraits/james_c_scott_v01_optimized.mp4",
    imageSrc: "/images/portraits/james_c_scott_s01_optimized.jpg",
    bio: "Political scientist and anthropologist known for his work on peasant societies, anarchism, and the critique of development and modernization. His concept of 'seeing like a state' has been influential across disciplines.",
    keyContributions: [
      "Seeing Like a State analysis",
      "Weapons of the Weak theory",
      "Critique of high modernism",
      "Anarchist political theory",
      "Peasant resistance studies"
    ],
    famousQuotes: [
      "The aspiration to such uniformity and order alerts us to the fact that modern statecraft is largely a project of internal colonization.",
      "Behind the egalitarian facades most of us are required to maintain, we nurse private ambitions and resentments that we rarely voice.",
      "Much of the appeal of the ideologies of high modernism lay in their claim to represent a clean slate."
    ],
    expertise: ["Political Science", "Anthropology", "Development Studies", "Anarchism", "State Theory"],
    nobel: false,
    featured: false
  },
  {
    id: "johann_wolfgang_von_goethe",
    name: "Johann Wolfgang von Goethe",
    title: "Writer & Natural Philosopher",
    era: "1749-1832",
    videoSrc: "/video/portraits/johann_wolfgang_von_goethe_v01_optimized.mp4",
    imageSrc: "/images/portraits/johann_wolfgang_von_goethe_s01_optimized.jpg",
    bio: "German writer and polymath who made contributions to literature, science, and philosophy. Author of Faust and a pioneer in the study of plant and animal morphology.",
    keyContributions: [
      "Faust literary masterpiece",
      "Theory of colors (optics)",
      "Plant morphology studies",
      "Literary romanticism",
      "Scientific methodology insights"
    ],
    famousQuotes: [
      "Whatever you can do or dream you can, begin it. Boldness has genius, power and magic in it.",
      "Knowing is not enough; we must apply. Willing is not enough; we must do.",
      "None are more hopelessly enslaved than those who falsely believe they are free."
    ],
    expertise: ["Literature", "Natural Philosophy", "Optics", "Botany", "Poetry"],
    nobel: false,
    featured: false
  },
  {
    id: "jorge_luis_borges",
    name: "Jorge Luis Borges",
    title: "Writer & Literary Theorist",
    era: "1899-1986",
    videoSrc: "/video/portraits/jorge_luis_borges_v01_optimized.mp4",
    imageSrc: "/images/portraits/jorge_luis_borges_s01_optimized.jpg",
    bio: "Argentine writer and literary theorist whose labyrinthine short stories and essays have had a profound influence on literature and philosophy. Master of magical realism and metafiction.",
    keyContributions: [
      "Labyrinths short story collection",
      "Metafictional narrative techniques",
      "Library of Babel concept",
      "Literary criticism and theory",
      "Magical realism development"
    ],
    famousQuotes: [
      "I have always imagined that Paradise will be a kind of library.",
      "Reality is not always probable, or likely.",
      "Time is the substance from which I am made. Time is a river which carries me along, but I am the river."
    ],
    expertise: ["Literature", "Philosophy", "Literary Theory", "Magical Realism", "Criticism"],
    nobel: false,
    featured: false
  },
  {
    id: "michel_de_montaigne",
    name: "Michel de Montaigne",
    title: "Philosopher & Essayist",
    era: "1533-1592",
    videoSrc: "/video/portraits/michel_de_montaigne_v01_optimized.mp4",
    imageSrc: "/images/portraits/michel_de_montaigne_s01_optimized.jpg",
    bio: "French philosopher who pioneered the essay as a literary form and is known for his skeptical philosophy and deep introspection. His Essays remain a masterwork of Renaissance humanism.",
    keyContributions: [
      "Pioneered the essay form",
      "Skeptical philosophy",
      "Humanistic approach to knowledge",
      "Self-examination and introspection",
      "Cultural relativism insights"
    ],
    famousQuotes: [
      "We are all patchwork, and so shapeless and diverse in composition that each bit, each moment, plays its own game.",
      "Nothing is so firmly believed as what we least know.",
      "The greatest thing in the world is to know how to belong to oneself."
    ],
    expertise: ["Philosophy", "Literature", "Skepticism", "Humanism", "Self-Knowledge"],
    nobel: false,
    featured: false
  },
  {
    id: "niels_bohr",
    name: "Niels Bohr",
    title: "Physicist & Nobel Laureate",
    era: "1885-1962",
    videoSrc: "/video/portraits/niels_bohr_v01_optimized.mp4",
    imageSrc: "/images/portraits/niels_bohr_s01_optimized.jpg",
    bio: "Danish physicist who made foundational contributions to understanding atomic structure and quantum theory. His principle of complementarity became central to quantum mechanics interpretation.",
    keyContributions: [
      "Bohr model of the atom",
      "Complementarity principle",
      "Copenhagen interpretation",
      "Quantum mechanics development",
      "Nuclear physics contributions"
    ],
    famousQuotes: [
      "The opposite of a correct statement is a false statement. But the opposite of a profound truth may well be another profound truth.",
      "Prediction is very difficult, especially about the future.",
      "How wonderful that we have met with a paradox. Now we have some hope of making progress."
    ],
    expertise: ["Physics", "Quantum Mechanics", "Atomic Theory", "Philosophy of Science"],
    nobel: true,
    featured: false
  },
  {
    id: "vannevar_bush",
    name: "Vannevar Bush",
    title: "Engineer & Science Administrator",
    era: "1890-1974",
    videoSrc: "/video/portraits/vannevar_bush_v01_optimized.mp4",
    imageSrc: "/images/portraits/vannevar_bush_s01_optimized.jpg",
    bio: "American engineer and science administrator who played a crucial role in the development of the atomic bomb and envisioned the concept of hypertext and the internet through his Memex idea.",
    keyContributions: [
      "Memex hypertext concept",
      "Manhattan Project administration",
      "Differential analyzer invention",
      "Science policy development",
      "Information theory precursor"
    ],
    famousQuotes: [
      "The real problem is not whether machines think but whether men do.",
      "Science has a simple faith, which transcends utility. It is the faith that it is the privilege of man to learn to understand.",
      "A record, if it is to be useful to science, must be continuously extended, it must be stored, and above all it must be consulted."
    ],
    expertise: ["Engineering", "Science Policy", "Computing", "Information Systems", "Innovation"],
    nobel: false,
    featured: false
  },
  {
    id: "plato",
    name: "Plato",
    title: "Philosopher & Founder of the Academy",
    era: "428-348 BCE",
    videoSrc: "/video/portraits/plato_s01_optimized.mp4",
    imageSrc: "/images/portraits/plato_s01_optimized.jpg",
    bio: "Ancient Greek philosopher and student of Socrates who founded the Academy in Athens. His dialogues and theory of Forms have profoundly influenced Western philosophy, politics, and education.",
    keyContributions: [
      "Theory of Forms",
      "Socratic dialogues",
      "The Republic political philosophy",
      "Academy founding",
      "Allegory of the Cave"
    ],
    famousQuotes: [
      "The unexamined life is not worth living.",
      "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.",
      "At the touch of love everyone becomes a poet."
    ],
    expertise: ["Philosophy", "Political Theory", "Education", "Ethics", "Metaphysics"],
    nobel: false,
    featured: false
  },
  {
    id: "seneca",
    name: "Seneca",
    title: "Stoic Philosopher & Roman Statesman",
    era: "4 BCE-65 CE",
    videoSrc: "/video/portraits/seneca_s01_optimized.mp4",
    imageSrc: "/images/portraits/seneca_s01_optimized.jpg",
    bio: "Roman Stoic philosopher, statesman, and advisor to Emperor Nero. His letters and essays on ethics, virtue, and practical wisdom have influenced moral philosophy for over two millennia.",
    keyContributions: [
      "Stoic moral philosophy",
      "Letters to Lucilius",
      "Moral Essays",
      "Political advisory role",
      "Practical wisdom teachings"
    ],
    famousQuotes: [
      "It is not that we have a short time to live, but that we waste a lot of it.",
      "Every change of fortune is either a trial or a reward.",
      "We suffer more often in imagination than in reality."
    ],
    expertise: ["Philosophy", "Stoicism", "Ethics", "Politics", "Rhetoric"],
    nobel: false,
    featured: false
  },
  {
    id: "niccolo_machiavelli",
    name: "Niccolò Machiavelli",
    title: "Political Theorist & Renaissance Writer",
    era: "1469-1527",
    videoSrc: "/video/portraits/machiavelli_s01_optimized.mp4",
    imageSrc: "/images/portraits/machiavelli_s01_optimized.jpg",
    bio: "Italian Renaissance political theorist whose works on statecraft and power politics fundamentally changed how we understand governance. His pragmatic approach to politics continues to influence leaders and thinkers.",
    keyContributions: [
      "The Prince political treatise",
      "Discourses on Livy",
      "Republican political theory",
      "Realist approach to politics",
      "Military strategy insights"
    ],
    famousQuotes: [
      "It is better to be feared than loved, if you cannot be both.",
      "Everyone sees what you appear to be, few experience what you really are.",
      "The lion cannot protect himself from traps, and the fox cannot defend himself from wolves."
    ],
    expertise: ["Political Science", "Strategy", "Statecraft", "Military Theory", "Renaissance Politics"],
    nobel: false,
    featured: false
  },
  {
    id: "ruixen",
    name: "Ruixen",
    title: "Atlas Creator & Developer",
    era: "Present",
    videoSrc: "/images/team/founder.png",
    imageSrc: "/images/team/founder.png",
    bio: "The creator and developer of Atlas, exploring the intersections between artificial intelligence, historical thought, and modern computational theory through curated dialogues and analysis.",
    keyContributions: [
      "Atlas platform development",
      "AI-human dialogue curation",
      "Historical persona simulation",
      "Computational philosophy exploration"
    ],
    famousQuotes: [
      "The bridge between past wisdom and future intelligence."
    ],
    expertise: ["Software Development", "AI Systems", "Digital Philosophy", "Content Curation"],
    nobel: false,
    featured: false
  }
]

// Helper functions
export const getFeaturedPersonas = (): Persona[] => {
  return personas.filter(persona => persona.featured)
}

export const getAllPersonas = (): Persona[] => {
  return personas
}

export const getPersonaById = (id: string): Persona | undefined => {
  return personas.find(persona => persona.id === id)
}

export const getPersonaByName = (name: string): Persona | undefined => {
  return personas.find(persona => persona.name === name)
}

// Create a mapping for quick lookup (used by Atlas and Explore pages)
export const personaMap: Record<string, { videoSrc: string; imageSrc: string }> =
  personas.reduce((acc, persona) => {
    acc[persona.name] = {
      videoSrc: persona.videoSrc,
      imageSrc: persona.imageSrc
    }
    return acc
  }, {} as Record<string, { videoSrc: string; imageSrc: string }>)