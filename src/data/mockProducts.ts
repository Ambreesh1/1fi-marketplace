// src/data/mockProducts.ts
// Mock "backend" data shaped like a real API response. Swapping to a real
// backend later only requires editing src/api/marketplaceApi.ts, not any UI.

export type EmiPlan = {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interest: number;
};

export type Variant = {
  id: string;
  label: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  image: string;
  basePrice: number;
  description: string;
  variants: Variant[];
  emiPlans: EmiPlan[];
};

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15',
    brand: 'Apple',
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/IPhone15.jpg",
    basePrice: 79900,
    description:
      'iPhone 15 with A16 Bionic chip, 48MP main camera, and USB-C. Buy now, pay later with no-cost EMI backed by your mutual funds.',
    variants: [
      { id: 'v1', label: '128GB · Blue', price: 79900 },
      { id: 'v2', label: '256GB · Blue', price: 89900 },
      { id: 'v3', label: '128GB · Black', price: 79900 },
    ],
    emiPlans: [
      { id: 'e1', tenureMonths: 3, monthlyAmount: 26634, interest: 0 },
      { id: 'e2', tenureMonths: 6, monthlyAmount: 13317, interest: 0 },
      { id: 'e3', tenureMonths: 12, monthlyAmount: 6659, interest: 0 },
    ],
  },
  {
    id: 'p2',
    name: 'MacBook Air M2',
    brand: 'Apple',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/MacBook_Air_%28A2681%29_front.jpg/960px-MacBook_Air_%28A2681%29_front.jpg?utm_source=chatgpt.com',
    basePrice: 114900,
    description:
      'Ultra-thin MacBook Air with the M2 chip, 18-hour battery life, and a stunning Liquid Retina display.',
    variants: [
      { id: 'v1', label: '8GB/256GB · Midnight', price: 114900 },
      { id: 'v2', label: '8GB/512GB · Midnight', price: 134900 },
    ],
    emiPlans: [
      { id: 'e1', tenureMonths: 6, monthlyAmount: 19150, interest: 0 },
      { id: 'e2', tenureMonths: 12, monthlyAmount: 9575, interest: 0 },
      { id: 'e3', tenureMonths: 24, monthlyAmount: 4788, interest: 0 },
    ],
  },
  {
    id: 'p3',
    name: 'Fine Silver Bracelet',
    brand: 'Giva',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Silver_bracelet.jpg',
    basePrice: 2499,
    description:
      '925 sterling silver bracelet with zirconia stones. Comes with a certificate of authenticity.',
    variants: [
      { id: 'v1', label: 'Size S', price: 2499 },
      { id: 'v2', label: 'Size M', price: 2499 },
      { id: 'v3', label: 'Size L', price: 2599 },
    ],
    emiPlans: [
      { id: 'e1', tenureMonths: 3, monthlyAmount: 833, interest: 0 },
      { id: 'e2', tenureMonths: 6, monthlyAmount: 417, interest: 0 },
    ],
  },
  {
    id: 'p4',
    name: 'Suzuki Access 125',
    brand: 'Suzuki',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Suzuki_Access_125%2C_2023.jpg',
    basePrice: 91000,
    description:
      "India's favourite 125cc scooter with best-in-class mileage and a spacious underseat storage.",
    variants: [
      { id: 'v1', label: 'Standard · Pearl White', price: 91000 },
      { id: 'v2', label: 'Special Edition · Matte Black', price: 96500 },
    ],
    emiPlans: [
      { id: 'e1', tenureMonths: 12, monthlyAmount: 7583, interest: 0 },
      { id: 'e2', tenureMonths: 24, monthlyAmount: 3792, interest: 0 },
      { id: 'e3', tenureMonths: 36, monthlyAmount: 2528, interest: 0 },
    ],
  },
];
