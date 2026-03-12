export type BiologyTopicId =
  | 'nucleus'
  | 'cell-membrane'
  | 'cytoplasm'
  | 'mitochondria'
  | 'osmosis'
  | 'diffusion'
  | 'white-blood-cells'
  | 'rbc'
  | 'platelets'
  | 'heart'
  | 'lungs'
  | 'intestines'
  | 'fixed-joints'
  | 'hinge-joint'
  | 'ball-socket-joint'
  | 'kingdom'
  | 'species'
  | 'carnivore'
  | 'herbivore'
  | 'omnivore'
  | 'protein-apples'
  | 'carbs'
  | 'fats'
  | 'water'
  | 'domains'
  | 'marsupials'
  | 'respiration'
  | 'cleavage'
  | 'gene'
  | 'protoplasm'
  | 'right-ventricle'
  | 'nervous-system'
  | 'food-chains';

export interface BiologyFact {
  id: BiologyTopicId;
  name: string;
  fact: string;
  contrast?: string;
  example?: string;
  memoryAnchor?: string;
  color: string;
  section: 'cell' | 'systems' | 'blood' | 'classification';
}

export interface BiologyQuizQuestion {
  id: BiologyTopicId;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  distractorTip?: string;
  memoryAnchor?: string;
}

export const BIOLOGY_FACTS: BiologyFact[] = [
  // Cell
  {
    id: 'nucleus',
    name: 'Nucleus',
    fact: 'The cell "control center" that contains DNA and directs cell activities.',
    contrast: 'Mitochondria produce energy; nucleus directs the cell.',
    example: 'DNA in the nucleus controls what proteins the cell makes.',
    memoryAnchor: 'Nucleus = command center.',
    color: '#22c55e',
    section: 'cell',
  },
  {
    id: 'cell-membrane',
    name: 'Cell Membrane',
    fact: 'The boundary of the cell; controls what enters and exits.',
    contrast: 'Nucleus holds DNA; membrane is the outer boundary.',
    example: 'Water and nutrients pass through the membrane.',
    memoryAnchor: 'Membrane = boundary, controls in/out.',
    color: '#16a34a',
    section: 'cell',
  },
  {
    id: 'cytoplasm',
    name: 'Cytoplasm',
    fact: 'The gel-like interior where organelles sit.',
    contrast: 'Cytoplasm is the fluid; organelles are the structures inside it.',
    example: 'Mitochondria and nucleus float in the cytoplasm.',
    memoryAnchor: 'Cytoplasm = gel interior.',
    color: '#15803d',
    section: 'cell',
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    fact: 'Produces energy for the cell; the "powerhouse."',
    contrast: 'Mitochondria make energy; nucleus holds DNA.',
    example: 'Cells need mitochondria to convert food into usable energy.',
    memoryAnchor: 'Mitochondria = powerhouse.',
    color: '#166534',
    section: 'cell',
  },
  {
    id: 'osmosis',
    name: 'Osmosis',
    fact: 'The diffusion of water across a membrane from an area of lower solute concentration to higher.',
    contrast: 'Diffusion can involve many particles; osmosis is specifically water across a membrane.',
    example: 'Water moving into/out of a cell through the membrane = osmosis.',
    memoryAnchor: 'Osmosis = water movement.',
    color: '#22c55e',
    section: 'cell',
  },
  {
    id: 'diffusion',
    name: 'Diffusion',
    fact: 'Movement of particles from high to low concentration; not limited to water.',
    contrast: 'Osmosis is water only; diffusion can involve many particle types.',
    example: 'Oxygen moving from lungs into blood is diffusion.',
    memoryAnchor: 'Diffusion = particles high to low.',
    color: '#16a34a',
    section: 'cell',
  },
  // Blood
  {
    id: 'white-blood-cells',
    name: 'White Blood Cells',
    fact: 'Fight infection and produce antibodies to protect the body.',
    contrast: 'WBCs do defense; RBCs carry oxygen; platelets clot blood.',
    example: 'Infection response = WBC role.',
    memoryAnchor: 'White blood cells = body defense.',
    color: '#ef4444',
    section: 'blood',
  },
  {
    id: 'rbc',
    name: 'Red Blood Cells',
    fact: 'Carry oxygen throughout the body.',
    contrast: 'RBCs carry oxygen; WBCs fight infection; platelets clot.',
    example: 'Hemoglobin in RBCs binds oxygen.',
    memoryAnchor: 'RBCs = oxygen carriers.',
    color: '#dc2626',
    section: 'blood',
  },
  {
    id: 'platelets',
    name: 'Platelets',
    fact: 'Help blood clot to stop bleeding.',
    contrast: 'Platelets clot; RBCs carry oxygen; WBCs fight infection.',
    example: 'A cut triggers platelets to form a clot.',
    memoryAnchor: 'Platelets = clotting.',
    color: '#b91c1c',
    section: 'blood',
  },
  // Body systems
  {
    id: 'heart',
    name: 'Human Heart',
    fact: 'The human heart has 4 chambers: two atria and two ventricles. Right ventricle pumps blood to the lungs.',
    contrast: 'Heart pumps blood; lungs exchange gases.',
    example: 'O2 enters blood in lungs, then heart circulates that blood.',
    memoryAnchor: 'Heart = 4 chambers. Right ventricle → lungs.',
    color: '#3b82f6',
    section: 'systems',
  },
  {
    id: 'lungs',
    name: 'Lungs',
    fact: 'Handle oxygen and carbon dioxide exchange (O2 in, CO2 out).',
    contrast: 'Lungs exchange gases; heart pumps blood.',
    example: 'You breathe in O2; lungs pass it to blood and remove CO2.',
    memoryAnchor: 'Lungs = gas exchange.',
    color: '#2563eb',
    section: 'systems',
  },
  {
    id: 'intestines',
    name: 'Intestines',
    fact: 'Belong to the digestive system; absorb nutrients from food.',
    contrast: 'Intestines are digestive; lungs are respiratory.',
    example: 'Nutrients from digested food enter the bloodstream in the intestines.',
    memoryAnchor: 'Intestines = digestive.',
    color: '#1d4ed8',
    section: 'systems',
  },
  {
    id: 'fixed-joints',
    name: 'Fixed Joints',
    fact: 'Immovable skull-type joints that allow no movement.',
    contrast: 'Fixed joints do not move; hinge and ball-and-socket joints do move.',
    example: 'Skull bones are held by fixed joints.',
    memoryAnchor: 'Skull joints = fixed.',
    color: '#1d4ed8',
    section: 'systems',
  },
  {
    id: 'hinge-joint',
    name: 'Hinge Joints',
    fact: 'Allow one-direction movement; found at elbow and knee.',
    contrast: 'Hinge moves one way; ball-and-socket has wide range; fixed does not move.',
    example: 'Elbow and knee are hinge joints.',
    memoryAnchor: 'Hinge = elbow, knee.',
    color: '#3b82f6',
    section: 'systems',
  },
  {
    id: 'ball-socket-joint',
    name: 'Ball-and-Socket Joints',
    fact: 'Allow wide movement range; found at shoulder and hip.',
    contrast: 'Ball-and-socket has wide range; hinge moves one plane; fixed does not move.',
    example: 'Shoulder and hip are ball-and-socket joints.',
    memoryAnchor: 'Ball-and-socket = shoulder, hip.',
    color: '#2563eb',
    section: 'systems',
  },
  // Classification & nutrition
  {
    id: 'kingdom',
    name: 'Kingdom',
    fact: 'The broadest biological classification in this test format.',
    contrast: 'Kingdom is broadest; species is most specific.',
    example: 'If asked broadest level, answer Kingdom.',
    memoryAnchor: 'Kingdom = broadest. KPCOFGS.',
    color: '#f59e0b',
    section: 'classification',
  },
  {
    id: 'species',
    name: 'Species',
    fact: 'The most specific biological classification level.',
    contrast: 'Species is most specific; kingdom is broadest.',
    example: 'Homo sapiens is the species level.',
    memoryAnchor: 'Species = most specific. KPCOFGS.',
    color: '#eab308',
    section: 'classification',
  },
  {
    id: 'carnivore',
    name: 'Carnivore',
    fact: 'A meat-only eater; organism that feeds primarily on meat.',
    contrast: 'Herbivore = plant-eater, omnivore = both plants and meat.',
    example: 'Lion = carnivore.',
    memoryAnchor: 'Meat-only = carnivore. Carn = carne/meat.',
    color: '#eab308',
    section: 'classification',
  },
  {
    id: 'herbivore',
    name: 'Herbivore',
    fact: 'A plant-only eater; organism that feeds primarily on plants.',
    contrast: 'Carnivore = meat-only, omnivore = both.',
    example: 'Cow = herbivore.',
    memoryAnchor: 'Plant-only = herbivore.',
    color: '#84cc16',
    section: 'classification',
  },
  {
    id: 'omnivore',
    name: 'Omnivore',
    fact: 'Eats both plants and meat.',
    contrast: 'Carnivore = meat-only, herbivore = plants-only.',
    example: 'Human = omnivore.',
    memoryAnchor: 'Both = omnivore.',
    color: '#a3e635',
    section: 'classification',
  },
  {
    id: 'protein-apples',
    name: 'Protein Sources',
    fact: 'Protein builds and repairs tissues; apples are not a meaningful protein source.',
    contrast: 'Chicken, eggs, fish are protein-rich; apples are not.',
    example: 'Protein in many foods, not apples.',
    memoryAnchor: 'Protein in many foods, not apples.',
    color: '#d97706',
    section: 'classification',
  },
  {
    id: 'carbs',
    name: 'Carbohydrates',
    fact: 'Provide quick energy for the body.',
    contrast: 'Carbs = quick energy; fats = long-term energy; protein = build/repair.',
    example: 'Bread, rice, and fruit are carb sources.',
    memoryAnchor: 'Carbs = quick energy.',
    color: '#f59e0b',
    section: 'classification',
  },
  {
    id: 'fats',
    name: 'Fats',
    fact: 'Provide long-term energy, insulation, and cell support.',
    contrast: 'Fats = long-term energy; carbs = quick energy.',
    example: 'Stored body fat provides energy when fasting.',
    memoryAnchor: 'Fats = long-term energy, insulation.',
    color: '#d97706',
    section: 'classification',
  },
  {
    id: 'water',
    name: 'Water',
    fact: 'Transport, temperature control, and chemical reactions.',
    contrast: 'Water is not a nutrient that provides calories; it supports processes.',
    example: 'Blood is mostly water; it transports nutrients.',
    memoryAnchor: 'Water = transport, temp control, reactions.',
    color: '#0ea5e9',
    section: 'classification',
  },
  // Missed topics — cell
  {
    id: 'respiration',
    name: 'Cellular Respiration',
    fact: 'The process by which energy is provided at the cellular level. Not metabolism (broader term).',
    contrast: 'Respiration = cellular energy; metabolism = all chemical processes in body.',
    example: 'Mitochondria carry out cellular respiration to produce ATP.',
    memoryAnchor: 'Energy at cellular level = respiration.',
    color: '#166534',
    section: 'cell',
  },
  {
    id: 'cleavage',
    name: 'Cleavage',
    fact: 'A series of cell divisions that results in the formation of an embryo. Not mitosis or meiosis.',
    contrast: 'Cleavage = embryo formation; mitosis = general cell division; meiosis = sex cells.',
    example: 'Early embryo development involves rapid cleavage divisions.',
    memoryAnchor: 'Cell divisions forming embryo = cleavage.',
    color: '#15803d',
    section: 'cell',
  },
  {
    id: 'gene',
    name: 'Gene',
    fact: 'A DNA unit that contains the code for a particular characteristic.',
    contrast: 'Gene = unit for one trait; chromosome = carries many genes.',
    example: 'Eye color is determined by genes.',
    memoryAnchor: 'DNA unit for characteristic = gene.',
    color: '#22c55e',
    section: 'cell',
  },
  {
    id: 'protoplasm',
    name: 'Cell Protoplasm',
    fact: 'Protoplasm and cells are made up mostly of water. Water is the most abundant inorganic substance in cells.',
    contrast: 'Water is inorganic; protein and sugar are organic.',
    example: 'Animal cells are mostly water by weight.',
    memoryAnchor: 'Protoplasm mostly water. Inorganic in cells = water.',
    color: '#0ea5e9',
    section: 'cell',
  },
  // Missed topics — systems
  {
    id: 'right-ventricle',
    name: 'Right Ventricle',
    fact: 'The chamber of the heart that pumps blood to the lungs.',
    contrast: 'Right ventricle → lungs; left ventricle → body.',
    example: 'Deoxygenated blood goes from right ventricle to lungs for O2.',
    memoryAnchor: 'Chamber pumping to lungs = right ventricle.',
    color: '#3b82f6',
    section: 'systems',
  },
  {
    id: 'nervous-system',
    name: 'Nervous System',
    fact: 'The spinal cord is part of the nervous system. Brain, spinal cord, and nerves.',
    contrast: 'Nervous = brain, spinal cord, nerves; circulatory = heart, blood vessels.',
    example: 'Spinal cord carries signals between brain and body.',
    memoryAnchor: 'Spinal cord part of = nervous system.',
    color: '#6366f1',
    section: 'systems',
  },
  // Missed topics — classification
  {
    id: 'domains',
    name: 'Biological Domains',
    fact: 'The three domains of life are Eukarya, Bacteria, and Archaea. Regelia is NOT a domain.',
    contrast: 'Domains = Eukarya, Bacteria, Archaea. Regelia is a distractor.',
    example: 'Humans belong to domain Eukarya.',
    memoryAnchor: 'Domains: Eukarya, Bacteria, Archaea. Not Regelia.',
    color: '#f59e0b',
    section: 'classification',
  },
  {
    id: 'marsupials',
    name: 'Marsupials',
    fact: 'Mammals that carry young in a pouch. Kangaroo is a marsupial.',
    contrast: 'Marsupial = pouch; platypus = monotreme; squirrel = placental mammal.',
    example: 'Kangaroo, koala, and opossum are marsupials.',
    memoryAnchor: 'Example marsupial = Kangaroo.',
    color: '#eab308',
    section: 'classification',
  },
  {
    id: 'food-chains',
    name: 'Food Chain Roles',
    fact: 'Producers (e.g., plankton, plants) make food from sunlight. Plankton → Shrimp → Salmon: plankton is the producer.',
    contrast: 'Producer = makes food; consumer = eats others; decomposer = breaks down dead matter.',
    example: 'In Plankton → Shrimp → Salmon → Sea Gull, plankton = producer.',
    memoryAnchor: 'Plankton role = Producer.',
    color: '#84cc16',
    section: 'classification',
  },
];

export const BIOLOGY_FACTS_CARDS = BIOLOGY_FACTS;

export function getBiologyFactById(id: BiologyTopicId): BiologyFact | undefined {
  return BIOLOGY_FACTS.find((f) => f.id === id);
}

export const BIOLOGY_QUIZ_QUESTIONS: BiologyQuizQuestion[] = [
  {
    id: 'nucleus',
    prompt: 'What is the cell "control center"?',
    options: ['Mitochondria', 'Cell membrane', 'Nucleus', 'Cytoplasm'],
    correctAnswer: 'Nucleus',
    explanation: 'The nucleus contains DNA and directs cell activities.',
    distractorTip: 'Mitochondria produce energy, but they are not the control center.',
    memoryAnchor: 'Nucleus = command center.',
  },
  {
    id: 'cell-membrane',
    prompt: 'What structure controls what enters and exits the cell?',
    options: ['Nucleus', 'Cytoplasm', 'Cell membrane', 'Mitochondria'],
    correctAnswer: 'Cell membrane',
    explanation: 'The cell membrane is the boundary that controls what enters and exits.',
    distractorTip: 'The nucleus holds DNA; the membrane is the outer boundary.',
    memoryAnchor: 'Membrane = boundary, controls in/out.',
  },
  {
    id: 'cytoplasm',
    prompt: 'What is the gel-like interior where organelles sit?',
    options: ['Nucleus', 'Cell membrane', 'Cytoplasm', 'Mitochondria'],
    correctAnswer: 'Cytoplasm',
    explanation: 'The cytoplasm is the gel-like interior that holds organelles.',
    distractorTip: 'Cytoplasm is the fluid; organelles are the structures inside it.',
    memoryAnchor: 'Cytoplasm = gel interior.',
  },
  {
    id: 'mitochondria',
    prompt: 'Which organelle is known as the cell "powerhouse"?',
    options: ['Nucleus', 'Cell membrane', 'Cytoplasm', 'Mitochondria'],
    correctAnswer: 'Mitochondria',
    explanation: 'Mitochondria produce energy for the cell.',
    distractorTip: 'The nucleus holds DNA; mitochondria make energy.',
    memoryAnchor: 'Mitochondria = powerhouse.',
  },
  {
    id: 'osmosis',
    prompt: 'What is osmosis?',
    options: [
      'Movement of oxygen',
      'Diffusion of water across a membrane',
      'Energy production',
      'Cell division',
    ],
    correctAnswer: 'Diffusion of water across a membrane',
    explanation: 'Osmosis is the passive movement of water across a membrane.',
    distractorTip: 'Diffusion can involve many molecules, but osmosis specifically refers to water.',
    memoryAnchor: 'Osmosis = water movement.',
  },
  {
    id: 'diffusion',
    prompt: 'What is the movement of particles from high to low concentration called?',
    options: ['Osmosis', 'Diffusion', 'Active transport', 'Filtration'],
    correctAnswer: 'Diffusion',
    explanation: 'Diffusion is movement of particles from high to low concentration.',
    distractorTip: 'Osmosis is a type of diffusion limited to water across a membrane.',
    memoryAnchor: 'Diffusion = particles high to low.',
  },
  {
    id: 'white-blood-cells',
    prompt: 'What do white blood cells do?',
    options: [
      'Carry oxygen',
      'Fight infection and produce antibodies',
      'Clot blood',
      'Store nutrients',
    ],
    correctAnswer: 'Fight infection and produce antibodies',
    explanation: 'White blood cells are part of the immune system.',
    distractorTip: 'Red blood cells carry oxygen; platelets help blood clot.',
    memoryAnchor: 'White blood cells = body defense.',
  },
  {
    id: 'rbc',
    prompt: 'What do red blood cells primarily do?',
    options: ['Fight infection', 'Carry oxygen', 'Clot blood', 'Store nutrients'],
    correctAnswer: 'Carry oxygen',
    explanation: 'Red blood cells carry oxygen throughout the body.',
    distractorTip: 'White blood cells fight infection; platelets clot blood.',
    memoryAnchor: 'RBCs = oxygen carriers.',
  },
  {
    id: 'platelets',
    prompt: 'What blood component helps blood clot?',
    options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'],
    correctAnswer: 'Platelets',
    explanation: 'Platelets help form clots to stop bleeding.',
    distractorTip: 'RBCs carry oxygen; WBCs fight infection; platelets clot.',
    memoryAnchor: 'Platelets = clotting.',
  },
  {
    id: 'heart',
    prompt: 'How many chambers does the human heart have?',
    options: ['Two', 'Three', 'Four', 'Five'],
    correctAnswer: 'Four',
    explanation: 'The human heart has 4 chambers: two atria and two ventricles.',
    distractorTip: 'Two-chamber hearts are found in some fish, not humans.',
    memoryAnchor: 'Heart = 4 chambers.',
  },
  {
    id: 'lungs',
    prompt: 'Which organ handles oxygen and carbon dioxide exchange?',
    options: ['Heart', 'Liver', 'Lungs', 'Kidneys'],
    correctAnswer: 'Lungs',
    explanation: 'Lungs exchange O2 in and CO2 out.',
    distractorTip: 'The heart pumps blood; the lungs exchange gases.',
    memoryAnchor: 'Lungs = gas exchange.',
  },
  {
    id: 'intestines',
    prompt: 'Which system do the intestines belong to?',
    options: ['Respiratory', 'Circulatory', 'Digestive', 'Nervous'],
    correctAnswer: 'Digestive',
    explanation: 'The intestines are part of the digestive system.',
    distractorTip: 'Respiratory is lungs/airway; digestive is food breakdown and nutrient absorption.',
    memoryAnchor: 'Intestines = digestive.',
  },
  {
    id: 'fixed-joints',
    prompt: 'What type of joints are immovable skull-type joints?',
    options: ['Hinge joints', 'Ball-and-socket joints', 'Fixed joints', 'Pivot joints'],
    correctAnswer: 'Fixed joints',
    explanation: 'Skull joints are fixed and allow no movement.',
    distractorTip: 'Hinge joints move in one plane (elbow/knee), unlike skull joints.',
    memoryAnchor: 'Skull joints = fixed.',
  },
  {
    id: 'hinge-joint',
    prompt: 'Which joints allow one-direction movement at the elbow and knee?',
    options: ['Fixed joints', 'Hinge joints', 'Ball-and-socket joints', 'Pivot joints'],
    correctAnswer: 'Hinge joints',
    explanation: 'Hinge joints allow movement in one plane; elbow and knee are examples.',
    distractorTip: 'Ball-and-socket allows wide range; hinge is one direction.',
    memoryAnchor: 'Hinge = elbow, knee.',
  },
  {
    id: 'ball-socket-joint',
    prompt: 'Which joints allow wide movement range at the shoulder and hip?',
    options: ['Fixed joints', 'Hinge joints', 'Ball-and-socket joints', 'Pivot joints'],
    correctAnswer: 'Ball-and-socket joints',
    explanation: 'Ball-and-socket joints allow rotation and wide range of motion.',
    distractorTip: 'Hinge joints move in one plane; ball-and-socket has full range.',
    memoryAnchor: 'Ball-and-socket = shoulder, hip.',
  },
  {
    id: 'kingdom',
    prompt: 'What is the broadest biological classification in this test format?',
    options: ['Species', 'Genus', 'Family', 'Kingdom'],
    correctAnswer: 'Kingdom',
    explanation: 'Kingdom is the broadest level of classification.',
    distractorTip: 'Species is the most specific classification level.',
    memoryAnchor: 'Kingdom = broadest.',
  },
  {
    id: 'species',
    prompt: 'What is the most specific biological classification level?',
    options: ['Kingdom', 'Phylum', 'Genus', 'Species'],
    correctAnswer: 'Species',
    explanation: 'Species is the most specific level in the classification hierarchy.',
    distractorTip: 'Kingdom is the broadest; species is the most specific.',
    memoryAnchor: 'Species = most specific.',
  },
  {
    id: 'carnivore',
    prompt: 'What is a meat-only eater called?',
    options: ['Herbivore', 'Omnivore', 'Carnivore', 'Detritivore'],
    correctAnswer: 'Carnivore',
    explanation: 'A carnivore eats primarily meat.',
    distractorTip: 'Omnivores eat both plants and meat, while herbivores eat plants.',
    memoryAnchor: 'Meat-only = carnivore.',
  },
  {
    id: 'herbivore',
    prompt: 'What is a plant-only eater called?',
    options: ['Carnivore', 'Herbivore', 'Omnivore', 'Detritivore'],
    correctAnswer: 'Herbivore',
    explanation: 'A herbivore eats primarily plants.',
    distractorTip: 'Carnivores eat meat; omnivores eat both.',
    memoryAnchor: 'Plant-only = herbivore.',
  },
  {
    id: 'omnivore',
    prompt: 'What is an organism that eats both plants and meat called?',
    options: ['Carnivore', 'Herbivore', 'Omnivore', 'Detritivore'],
    correctAnswer: 'Omnivore',
    explanation: 'An omnivore eats both plants and meat.',
    distractorTip: 'Humans are omnivores; carnivores eat meat only.',
    memoryAnchor: 'Both = omnivore.',
  },
  {
    id: 'protein-apples',
    prompt: 'Which of these is NOT a meaningful protein source?',
    options: ['Chicken', 'Eggs', 'Apples', 'Fish'],
    correctAnswer: 'Apples',
    explanation: 'Protein is in many foods, but apples are not a meaningful protein source.',
    distractorTip: 'Chicken, eggs, and fish are protein-rich foods.',
    memoryAnchor: 'Protein in many foods, not apples.',
  },
  {
    id: 'carbs',
    prompt: 'What is the primary role of carbohydrates?',
    options: ['Build tissues', 'Quick energy', 'Long-term energy storage', 'Clot blood'],
    correctAnswer: 'Quick energy',
    explanation: 'Carbohydrates provide quick energy for the body.',
    distractorTip: 'Protein builds tissues; fats provide long-term energy.',
    memoryAnchor: 'Carbs = quick energy.',
  },
  {
    id: 'fats',
    prompt: 'What do fats primarily provide?',
    options: ['Quick energy', 'Long-term energy and insulation', 'Oxygen transport', 'Infection defense'],
    correctAnswer: 'Long-term energy and insulation',
    explanation: 'Fats provide long-term energy, insulation, and cell support.',
    distractorTip: 'Carbs provide quick energy; fats are for long-term storage.',
    memoryAnchor: 'Fats = long-term energy, insulation.',
  },
  {
    id: 'water',
    prompt: 'What roles does water play in the body?',
    options: [
      'Quick energy',
      'Transport, temperature control, chemical reactions',
      'Build tissues',
      'Clot blood',
    ],
    correctAnswer: 'Transport, temperature control, chemical reactions',
    explanation: 'Water supports transport, temperature control, and chemical reactions.',
    distractorTip: 'Water does not provide calories; it supports body processes.',
    memoryAnchor: 'Water = transport, temp control, reactions.',
  },
  {
    id: 'respiration',
    prompt: 'The process by which energy is provided at the cellular level is called:',
    options: ['Respiration', 'Recreation', 'Oxidation', 'Metabolism'],
    correctAnswer: 'Respiration',
    explanation: 'Cellular respiration provides energy at the cellular level.',
    distractorTip: 'Metabolism is broader (all chemical processes); respiration is specifically cellular energy.',
    memoryAnchor: 'Energy at cellular level = respiration.',
  },
  {
    id: 'cleavage',
    prompt: 'A series of cell divisions that results in the formation of an embryo is called:',
    options: ['Mitosis', 'Meiosis', 'Osmosis', 'Cleavage'],
    correctAnswer: 'Cleavage',
    explanation: 'Cleavage is the rapid cell division that forms an embryo.',
    distractorTip: 'Mitosis and meiosis are general cell division types; cleavage is specific to embryo formation.',
    memoryAnchor: 'Cell divisions forming embryo = cleavage.',
  },
  {
    id: 'gene',
    prompt: 'A _____ is a DNA unit that contains the code for a particular characteristic.',
    options: ['Gene', 'Chromosome', 'Allele', 'Double helix'],
    correctAnswer: 'Gene',
    explanation: 'A gene is a DNA unit that codes for a specific trait.',
    distractorTip: 'Chromosomes carry many genes; a gene is the unit for one characteristic.',
    memoryAnchor: 'DNA unit for characteristic = gene.',
  },
  {
    id: 'protoplasm',
    prompt: 'Cell protoplasm is made up mostly of:',
    options: ['Water', 'Oxygen', 'Sugar', 'Protein'],
    correctAnswer: 'Water',
    explanation: 'Protoplasm and cells are mostly water.',
    distractorTip: 'Water is the most abundant inorganic substance in cells.',
    memoryAnchor: 'Protoplasm mostly water.',
  },
  {
    id: 'right-ventricle',
    prompt: 'The chamber of the heart that pumps blood to the lungs is called the:',
    options: ['Right ventricle', 'Left ventricle', 'Right atrium', 'Left atrium'],
    correctAnswer: 'Right ventricle',
    explanation: 'The right ventricle pumps deoxygenated blood to the lungs.',
    distractorTip: 'Right ventricle → lungs; left ventricle → body.',
    memoryAnchor: 'Chamber pumping to lungs = right ventricle.',
  },
  {
    id: 'nervous-system',
    prompt: 'The spinal cord is part of the:',
    options: ['Circulatory system', 'Nervous system', 'Respiratory system', 'Digestive system'],
    correctAnswer: 'Nervous system',
    explanation: 'The spinal cord, brain, and nerves make up the nervous system.',
    distractorTip: 'Spinal cord carries nerve signals; it is not part of circulatory or respiratory systems.',
    memoryAnchor: 'Spinal cord part of = nervous system.',
  },
  {
    id: 'domains',
    prompt: 'All of the following are domains except:',
    options: ['Regelia', 'Eukarya', 'Bacteria', 'Archaea'],
    correctAnswer: 'Regelia',
    explanation: 'The three domains are Eukarya, Bacteria, and Archaea. Regelia is not a domain.',
    distractorTip: 'Regelia is a common distractor; the real domains are Eukarya, Bacteria, Archaea.',
    memoryAnchor: 'Domains: Eukarya, Bacteria, Archaea. Not Regelia.',
  },
  {
    id: 'marsupials',
    prompt: 'An example of a marsupial is:',
    options: ['Squirrel', 'Kangaroo', 'Platypus', 'Woodpecker'],
    correctAnswer: 'Kangaroo',
    explanation: 'Kangaroos are marsupials; they carry young in a pouch.',
    distractorTip: 'Marsupials have pouches; platypus is a monotreme; squirrel is placental.',
    memoryAnchor: 'Example marsupial = Kangaroo.',
  },
  {
    id: 'food-chains',
    prompt: 'In this food chain, Plankton → Shrimp → Salmon → Sea Gull → Falcon, the role of the plankton is:',
    options: ['Producer', 'Primary consumer', 'Secondary consumer', 'Decomposer'],
    correctAnswer: 'Producer',
    explanation: 'Plankton (like phytoplankton) are producers; they make food from sunlight.',
    distractorTip: 'Producers make food; consumers eat others; plankton starts the chain.',
    memoryAnchor: 'Plankton role = Producer.',
  },
];

// 60-Second Recall Drill questions (from review sheet)
export interface RecallDrillItem {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  topicId?: BiologyTopicId;
}

export const RECALL_DRILL_ITEMS: RecallDrillItem[] = [
  {
    id: '1',
    question: 'Broadest classification level?',
    correctAnswer: 'Kingdom',
    options: ['Kingdom', 'Species', 'Genus', 'Family'],
    topicId: 'kingdom',
  },
  {
    id: '2',
    question: 'Meat-only eater?',
    correctAnswer: 'Carnivore',
    options: ['Carnivore', 'Herbivore', 'Omnivore', 'Detritivore'],
    topicId: 'carnivore',
  },
  {
    id: '3',
    question: 'Cell control center?',
    correctAnswer: 'Nucleus',
    options: ['Nucleus', 'Mitochondria', 'Cell membrane', 'Cytoplasm'],
    topicId: 'nucleus',
  },
  {
    id: '4',
    question: 'Osmosis definition?',
    correctAnswer: 'Water movement across a membrane',
    options: [
      'Water movement across a membrane',
      'Movement of oxygen',
      'Energy production',
      'Particle movement high to low',
    ],
    topicId: 'osmosis',
  },
  {
    id: '5',
    question: 'Intestines belong to what system?',
    correctAnswer: 'Digestive',
    options: ['Digestive', 'Respiratory', 'Circulatory', 'Nervous'],
    topicId: 'intestines',
  },
  {
    id: '6',
    question: 'Function of white blood cells?',
    correctAnswer: 'Fight infection',
    options: ['Fight infection', 'Carry oxygen', 'Clot blood', 'Store nutrients'],
    topicId: 'white-blood-cells',
  },
  {
    id: '7',
    question: 'Human heart chamber count?',
    correctAnswer: 'Four',
    options: ['Two', 'Three', 'Four', 'Five'],
    topicId: 'heart',
  },
  {
    id: '8',
    question: 'Immovable skull joint type?',
    correctAnswer: 'Fixed joints',
    options: ['Fixed joints', 'Hinge joints', 'Ball-and-socket joints', 'Pivot joints'],
    topicId: 'fixed-joints',
  },
  {
    id: '9',
    question: 'Difference between RBCs and platelets?',
    correctAnswer: 'RBCs carry oxygen; platelets clot blood',
    options: [
      'RBCs carry oxygen; platelets clot blood',
      'RBCs fight infection; platelets carry oxygen',
      'Both carry oxygen',
      'Both clot blood',
    ],
    topicId: 'rbc',
  },
  {
    id: '10',
    question: 'Apples meaningful protein source (yes/no)?',
    correctAnswer: 'No',
    options: ['Yes', 'No'],
    topicId: 'protein-apples',
  },
  {
    id: '11',
    question: 'Energy at cellular level?',
    correctAnswer: 'Respiration',
    options: ['Respiration', 'Metabolism', 'Oxidation', 'Recreation'],
    topicId: 'respiration',
  },
  {
    id: '12',
    question: 'Cell divisions forming embryo?',
    correctAnswer: 'Cleavage',
    options: ['Cleavage', 'Mitosis', 'Meiosis', 'Osmosis'],
    topicId: 'cleavage',
  },
  {
    id: '13',
    question: 'DNA unit for a characteristic?',
    correctAnswer: 'Gene',
    options: ['Gene', 'Chromosome', 'Allele', 'Double helix'],
    topicId: 'gene',
  },
  {
    id: '14',
    question: 'Protoplasm mostly made of?',
    correctAnswer: 'Water',
    options: ['Water', 'Oxygen', 'Sugar', 'Protein'],
    topicId: 'protoplasm',
  },
  {
    id: '15',
    question: 'Chamber pumping blood to lungs?',
    correctAnswer: 'Right ventricle',
    options: ['Right ventricle', 'Left ventricle', 'Right atrium', 'Left atrium'],
    topicId: 'right-ventricle',
  },
  {
    id: '16',
    question: 'Spinal cord part of which system?',
    correctAnswer: 'Nervous system',
    options: ['Nervous system', 'Circulatory', 'Respiratory', 'Digestive'],
    topicId: 'nervous-system',
  },
  {
    id: '17',
    question: 'Which is NOT a domain? (Eukarya, Bacteria, Archaea, Regelia)',
    correctAnswer: 'Regelia',
    options: ['Regelia', 'Eukarya', 'Bacteria', 'Archaea'],
    topicId: 'domains',
  },
  {
    id: '18',
    question: 'Example of a marsupial?',
    correctAnswer: 'Kangaroo',
    options: ['Kangaroo', 'Squirrel', 'Platypus', 'Woodpecker'],
    topicId: 'marsupials',
  },
  {
    id: '19',
    question: 'Plankton role in food chain?',
    correctAnswer: 'Producer',
    options: ['Producer', 'Primary consumer', 'Secondary consumer', 'Decomposer'],
    topicId: 'food-chains',
  },
];

// Trap-Answer Checklist items
export interface TrapChecklistItem {
  id: string;
  pair: string;
  distinction: string;
  topicIds: BiologyTopicId[];
}

export const TRAP_CHECKLIST_ITEMS: TrapChecklistItem[] = [
  {
    id: '1',
    pair: 'Kingdom vs species',
    distinction: 'Kingdom = broadest. Species = most specific.',
    topicIds: ['kingdom', 'species'],
  },
  {
    id: '2',
    pair: 'Carnivore vs omnivore vs herbivore',
    distinction: 'Carnivore = meat. Herbivore = plants. Omnivore = both.',
    topicIds: ['carnivore', 'herbivore', 'omnivore'],
  },
  {
    id: '3',
    pair: 'Osmosis vs diffusion',
    distinction: 'Osmosis = water only. Diffusion = general particles.',
    topicIds: ['osmosis', 'diffusion'],
  },
  {
    id: '4',
    pair: 'WBC vs RBC vs platelets',
    distinction: 'WBC = defense. RBC = oxygen. Platelets = clotting.',
    topicIds: ['white-blood-cells', 'rbc', 'platelets'],
  },
  {
    id: '5',
    pair: 'Fixed vs hinge vs ball-and-socket joints',
    distinction: 'Fixed = no movement. Hinge = one direction. Ball-and-socket = wide range.',
    topicIds: ['fixed-joints', 'hinge-joint', 'ball-socket-joint'],
  },
  {
    id: '6',
    pair: 'Heart chamber count',
    distinction: 'Human heart = 4 chambers (2 atria, 2 ventricles).',
    topicIds: ['heart'],
  },
  {
    id: '7',
    pair: 'Intestines system',
    distinction: 'Intestines = digestive system.',
    topicIds: ['intestines'],
  },
  {
    id: '8',
    pair: 'Apples protein',
    distinction: 'Apples are NOT a meaningful protein source.',
    topicIds: ['protein-apples'],
  },
  {
    id: '9',
    pair: 'Respiration vs metabolism',
    distinction: 'Respiration = energy at cellular level. Metabolism = all chemical processes in body.',
    topicIds: ['respiration'],
  },
  {
    id: '10',
    pair: 'Domains vs Regelia',
    distinction: 'Domains = Eukarya, Bacteria, Archaea. Regelia is NOT a domain.',
    topicIds: ['domains'],
  },
  {
    id: '11',
    pair: 'Cleavage vs mitosis vs meiosis',
    distinction: 'Cleavage = cell divisions forming embryo. Mitosis = general division. Meiosis = sex cells.',
    topicIds: ['cleavage'],
  },
];
