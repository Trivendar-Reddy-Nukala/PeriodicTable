export interface Element {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: string;
  period: number;
  group: number;
  block: string;
}

export const categories = [
  'alkali metal',
  'alkaline earth metal',
  'transition metal',
  'post-transition metal',
  'metalloid',
  'nonmetal',
  'noble gas',
  'lanthanide',
  'actinide',
  'unknown'
] as const;

const categoryColors = {
  'alkali metal': '#FF6B6B',
  'alkaline earth metal': '#4ECDC4',
  'transition metal': '#45B7D1',
  'post-transition metal': '#96CEB4',
  'metalloid': '#FFEEAD',
  'nonmetal': '#D4A5A5',
  'noble gas': '#9B59B6',
  'lanthanide': '#3498DB',
  'actinide': '#E74C3C',
  'unknown': '#95A5A6'
};

export const getCategoryColor = (category: string): string => {
  return categoryColors[category as keyof typeof categoryColors] || '#95A5A6';
};

export const elements: Element[] = [
  // Period 1
  {
    number: 1,
    symbol: 'H',
    name: 'Hydrogen',
    atomic_mass: 1.008,
    category: 'nonmetal',
    period: 1,
    group: 1,
    block: 's'
  },
  {
    number: 2,
    symbol: 'He',
    name: 'Helium',
    atomic_mass: 4.002602,
    category: 'noble gas',
    period: 1,
    group: 18,
    block: 's'
  },
  // Period 2
  {
    number: 3,
    symbol: 'Li',
    name: 'Lithium',
    atomic_mass: 6.94,
    category: 'alkali metal',
    period: 2,
    group: 1,
    block: 's'
  },
  {
    number: 4,
    symbol: 'Be',
    name: 'Beryllium',
    atomic_mass: 9.0121831,
    category: 'alkaline earth metal',
    period: 2,
    group: 2,
    block: 's'
  },
  {
    number: 5,
    symbol: 'B',
    name: 'Boron',
    atomic_mass: 10.81,
    category: 'metalloid',
    period: 2,
    group: 13,
    block: 'p'
  },
  {
    number: 6,
    symbol: 'C',
    name: 'Carbon',
    atomic_mass: 12.011,
    category: 'nonmetal',
    period: 2,
    group: 14,
    block: 'p'
  },
  {
    number: 7,
    symbol: 'N',
    name: 'Nitrogen',
    atomic_mass: 14.007,
    category: 'nonmetal',
    period: 2,
    group: 15,
    block: 'p'
  },
  {
    number: 8,
    symbol: 'O',
    name: 'Oxygen',
    atomic_mass: 15.999,
    category: 'nonmetal',
    period: 2,
    group: 16,
    block: 'p'
  },
  {
    number: 9,
    symbol: 'F',
    name: 'Fluorine',
    atomic_mass: 18.998403163,
    category: 'nonmetal',
    period: 2,
    group: 17,
    block: 'p'
  },
  {
    number: 10,
    symbol: 'Ne',
    name: 'Neon',
    atomic_mass: 20.1797,
    category: 'noble gas',
    period: 2,
    group: 18,
    block: 'p'
  },
  // Period 3
  {
    number: 11,
    symbol: 'Na',
    name: 'Sodium',
    atomic_mass: 22.98976928,
    category: 'alkali metal',
    period: 3,
    group: 1,
    block: 's'
  },
  {
    number: 12,
    symbol: 'Mg',
    name: 'Magnesium',
    atomic_mass: 24.305,
    category: 'alkaline earth metal',
    period: 3,
    group: 2,
    block: 's'
  },
  {
    number: 13,
    symbol: 'Al',
    name: 'Aluminum',
    atomic_mass: 26.9815385,
    category: 'post-transition metal',
    period: 3,
    group: 13,
    block: 'p'
  },
  {
    number: 14,
    symbol: 'Si',
    name: 'Silicon',
    atomic_mass: 28.085,
    category: 'metalloid',
    period: 3,
    group: 14,
    block: 'p'
  },
  {
    number: 15,
    symbol: 'P',
    name: 'Phosphorus',
    atomic_mass: 30.973761998,
    category: 'nonmetal',
    period: 3,
    group: 15,
    block: 'p'
  },
  {
    number: 16,
    symbol: 'S',
    name: 'Sulfur',
    atomic_mass: 32.06,
    category: 'nonmetal',
    period: 3,
    group: 16,
    block: 'p'
  },
  {
    number: 17,
    symbol: 'Cl',
    name: 'Chlorine',
    atomic_mass: 35.45,
    category: 'nonmetal',
    period: 3,
    group: 17,
    block: 'p'
  },
  {
    number: 18,
    symbol: 'Ar',
    name: 'Argon',
    atomic_mass: 39.948,
    category: 'noble gas',
    period: 3,
    group: 18,
    block: 'p'
  },
  // Period 4
  {
    number: 19,
    symbol: 'K',
    name: 'Potassium',
    atomic_mass: 39.0983,
    category: 'alkali metal',
    period: 4,
    group: 1,
    block: 's'
  },
  {
    number: 20,
    symbol: 'Ca',
    name: 'Calcium',
    atomic_mass: 40.078,
    category: 'alkaline earth metal',
    period: 4,
    group: 2,
    block: 's'
  },
  {
    number: 21,
    symbol: 'Sc',
    name: 'Scandium',
    atomic_mass: 44.955908,
    category: 'transition metal',
    period: 4,
    group: 3,
    block: 'd'
  },
  {
    number: 22,
    symbol: 'Ti',
    name: 'Titanium',
    atomic_mass: 47.867,
    category: 'transition metal',
    period: 4,
    group: 4,
    block: 'd'
  },
  {
    number: 23,
    symbol: 'V',
    name: 'Vanadium',
    atomic_mass: 50.9415,
    category: 'transition metal',
    period: 4,
    group: 5,
    block: 'd'
  },
  {
    number: 24,
    symbol: 'Cr',
    name: 'Chromium',
    atomic_mass: 51.9961,
    category: 'transition metal',
    period: 4,
    group: 6,
    block: 'd'
  },
  {
    number: 25,
    symbol: 'Mn',
    name: 'Manganese',
    atomic_mass: 54.938044,
    category: 'transition metal',
    period: 4,
    group: 7,
    block: 'd'
  },
  {
    number: 26,
    symbol: 'Fe',
    name: 'Iron',
    atomic_mass: 55.845,
    category: 'transition metal',
    period: 4,
    group: 8,
    block: 'd'
  },
  {
    number: 27,
    symbol: 'Co',
    name: 'Cobalt',
    atomic_mass: 58.933194,
    category: 'transition metal',
    period: 4,
    group: 9,
    block: 'd'
  },
  {
    number: 28,
    symbol: 'Ni',
    name: 'Nickel',
    atomic_mass: 58.6934,
    category: 'transition metal',
    period: 4,
    group: 10,
    block: 'd'
  },
  {
    number: 29,
    symbol: 'Cu',
    name: 'Copper',
    atomic_mass: 63.546,
    category: 'transition metal',
    period: 4,
    group: 11,
    block: 'd'
  },
  {
    number: 30,
    symbol: 'Zn',
    name: 'Zinc',
    atomic_mass: 65.38,
    category: 'transition metal',
    period: 4,
    group: 12,
    block: 'd'
  },
  {
    number: 31,
    symbol: 'Ga',
    name: 'Gallium',
    atomic_mass: 69.723,
    category: 'post-transition metal',
    period: 4,
    group: 13,
    block: 'p'
  },
  {
    number: 32,
    symbol: 'Ge',
    name: 'Germanium',
    atomic_mass: 72.630,
    category: 'metalloid',
    period: 4,
    group: 14,
    block: 'p'
  },
  {
    number: 33,
    symbol: 'As',
    name: 'Arsenic',
    atomic_mass: 74.921595,
    category: 'metalloid',
    period: 4,
    group: 15,
    block: 'p'
  },
  {
    number: 34,
    symbol: 'Se',
    name: 'Selenium',
    atomic_mass: 78.971,
    category: 'nonmetal',
    period: 4,
    group: 16,
    block: 'p'
  },
  {
    number: 35,
    symbol: 'Br',
    name: 'Bromine',
    atomic_mass: 79.904,
    category: 'nonmetal',
    period: 4,
    group: 17,
    block: 'p'
  },
  {
    number: 36,
    symbol: 'Kr',
    name: 'Krypton',
    atomic_mass: 83.798,
    category: 'noble gas',
    period: 4,
    group: 18,
    block: 'p'
  },
  // Period 5
  {
    number: 37,
    symbol: 'Rb',
    name: 'Rubidium',
    atomic_mass: 85.4678,
    category: 'alkali metal',
    period: 5,
    group: 1,
    block: 's'
  },
  {
    number: 38,
    symbol: 'Sr',
    name: 'Strontium',
    atomic_mass: 87.62,
    category: 'alkaline earth metal',
    period: 5,
    group: 2,
    block: 's'
  },
  {
    number: 39,
    symbol: 'Y',
    name: 'Yttrium',
    atomic_mass: 88.90584,
    category: 'transition metal',
    period: 5,
    group: 3,
    block: 'd'
  },
  {
    number: 40,
    symbol: 'Zr',
    name: 'Zirconium',
    atomic_mass: 91.224,
    category: 'transition metal',
    period: 5,
    group: 4,
    block: 'd'
  },
  {
    number: 41,
    symbol: 'Nb',
    name: 'Niobium',
    atomic_mass: 92.90637,
    category: 'transition metal',
    period: 5,
    group: 5,
    block: 'd'
  },
  {
    number: 42,
    symbol: 'Mo',
    name: 'Molybdenum',
    atomic_mass: 95.95,
    category: 'transition metal',
    period: 5,
    group: 6,
    block: 'd'
  },
  {
    number: 43,
    symbol: 'Tc',
    name: 'Technetium',
    atomic_mass: 98,
    category: 'transition metal',
    period: 5,
    group: 7,
    block: 'd'
  },
  {
    number: 44,
    symbol: 'Ru',
    name: 'Ruthenium',
    atomic_mass: 101.07,
    category: 'transition metal',
    period: 5,
    group: 8,
    block: 'd'
  },
  {
    number: 45,
    symbol: 'Rh',
    name: 'Rhodium',
    atomic_mass: 102.90550,
    category: 'transition metal',
    period: 5,
    group: 9,
    block: 'd'
  },
  {
    number: 46,
    symbol: 'Pd',
    name: 'Palladium',
    atomic_mass: 106.42,
    category: 'transition metal',
    period: 5,
    group: 10,
    block: 'd'
  },
  {
    number: 47,
    symbol: 'Ag',
    name: 'Silver',
    atomic_mass: 107.8682,
    category: 'transition metal',
    period: 5,
    group: 11,
    block: 'd'
  },
  {
    number: 48,
    symbol: 'Cd',
    name: 'Cadmium',
    atomic_mass: 112.414,
    category: 'transition metal',
    period: 5,
    group: 12,
    block: 'd'
  },
  {
    number: 49,
    symbol: 'In',
    name: 'Indium',
    atomic_mass: 114.818,
    category: 'post-transition metal',
    period: 5,
    group: 13,
    block: 'p'
  },
  {
    number: 50,
    symbol: 'Sn',
    name: 'Tin',
    atomic_mass: 118.710,
    category: 'post-transition metal',
    period: 5,
    group: 14,
    block: 'p'
  },
  {
    number: 51,
    symbol: 'Sb',
    name: 'Antimony',
    atomic_mass: 121.760,
    category: 'metalloid',
    period: 5,
    group: 15,
    block: 'p'
  },
  {
    number: 52,
    symbol: 'Te',
    name: 'Tellurium',
    atomic_mass: 127.60,
    category: 'metalloid',
    period: 5,
    group: 16,
    block: 'p'
  },
  {
    number: 53,
    symbol: 'I',
    name: 'Iodine',
    atomic_mass: 126.90447,
    category: 'nonmetal',
    period: 5,
    group: 17,
    block: 'p'
  },
  {
    number: 54,
    symbol: 'Xe',
    name: 'Xenon',
    atomic_mass: 131.293,
    category: 'noble gas',
    period: 5,
    group: 18,
    block: 'p'
  },
  // Period 6
  {
    number: 55,
    symbol: 'Cs',
    name: 'Cesium',
    atomic_mass: 132.90545196,
    category: 'alkali metal',
    period: 6,
    group: 1,
    block: 's'
  },
  {
    number: 56,
    symbol: 'Ba',
    name: 'Barium',
    atomic_mass: 137.327,
    category: 'alkaline earth metal',
    period: 6,
    group: 2,
    block: 's'
  },
  // Lanthanides
  {
    number: 57,
    symbol: 'La',
    name: 'Lanthanum',
    atomic_mass: 138.90547,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 58,
    symbol: 'Ce',
    name: 'Cerium',
    atomic_mass: 140.116,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 59,
    symbol: 'Pr',
    name: 'Praseodymium',
    atomic_mass: 140.90766,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 60,
    symbol: 'Nd',
    name: 'Neodymium',
    atomic_mass: 144.242,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 61,
    symbol: 'Pm',
    name: 'Promethium',
    atomic_mass: 145,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 62,
    symbol: 'Sm',
    name: 'Samarium',
    atomic_mass: 150.36,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 63,
    symbol: 'Eu',
    name: 'Europium',
    atomic_mass: 151.964,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 64,
    symbol: 'Gd',
    name: 'Gadolinium',
    atomic_mass: 157.25,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 65,
    symbol: 'Tb',
    name: 'Terbium',
    atomic_mass: 158.92535,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 66,
    symbol: 'Dy',
    name: 'Dysprosium',
    atomic_mass: 162.500,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 67,
    symbol: 'Ho',
    name: 'Holmium',
    atomic_mass: 164.93033,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 68,
    symbol: 'Er',
    name: 'Erbium',
    atomic_mass: 167.259,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 69,
    symbol: 'Tm',
    name: 'Thulium',
    atomic_mass: 168.93422,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 70,
    symbol: 'Yb',
    name: 'Ytterbium',
    atomic_mass: 173.045,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  {
    number: 71,
    symbol: 'Lu',
    name: 'Lutetium',
    atomic_mass: 174.9668,
    category: 'lanthanide',
    period: 6,
    group: 3,
    block: 'f'
  },
  // Actinides
  {
    number: 89,
    symbol: 'Ac',
    name: 'Actinium',
    atomic_mass: 227,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 90,
    symbol: 'Th',
    name: 'Thorium',
    atomic_mass: 232.0377,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 91,
    symbol: 'Pa',
    name: 'Protactinium',
    atomic_mass: 231.03588,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 92,
    symbol: 'U',
    name: 'Uranium',
    atomic_mass: 238.02891,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 93,
    symbol: 'Np',
    name: 'Neptunium',
    atomic_mass: 237,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 94,
    symbol: 'Pu',
    name: 'Plutonium',
    atomic_mass: 244,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 95,
    symbol: 'Am',
    name: 'Americium',
    atomic_mass: 243,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 96,
    symbol: 'Cm',
    name: 'Curium',
    atomic_mass: 247,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 97,
    symbol: 'Bk',
    name: 'Berkelium',
    atomic_mass: 247,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 98,
    symbol: 'Cf',
    name: 'Californium',
    atomic_mass: 251,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 99,
    symbol: 'Es',
    name: 'Einsteinium',
    atomic_mass: 252,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 100,
    symbol: 'Fm',
    name: 'Fermium',
    atomic_mass: 257,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 101,
    symbol: 'Md',
    name: 'Mendelevium',
    atomic_mass: 258,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 102,
    symbol: 'No',
    name: 'Nobelium',
    atomic_mass: 259,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  },
  {
    number: 103,
    symbol: 'Lr',
    name: 'Lawrencium',
    atomic_mass: 262,
    category: 'actinide',
    period: 7,
    group: 3,
    block: 'f'
  }
]; 