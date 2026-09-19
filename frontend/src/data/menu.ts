export type MenuCategory = 'food' | 'merch' | 'rewards';

export interface MenuItem {
  id: string;
  name: string;
  category: 'food' | 'merch';
  price: number;
  originalPrice?: number;
  description: string;
  prepTime: string;
  tag?: string;
  image: string;
  popular?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'apex-burger',
    name: 'APEX BURGER',
    category: 'food',
    price: 16.50,
    originalPrice: 20.00,
    description: 'Double Angus beef, brioche bun, house-made pickle, melted cheddar & secret burger sauce.',
    prepTime: 'Ready in 3 mins',
    tag: 'HOT SELLER',
    image: '/images/burger.jpg',
    popular: true,
  },
  {
    id: 'loaded-fries',
    name: 'TRACKSIDE LOADED FRIES',
    category: 'food',
    price: 12.00,
    originalPrice: 15.00,
    description: 'Crispy skin-on fries, 12-hr slow-smoked brisket, pickled jalapeños & warm queso.',
    prepTime: 'Ready in 2 mins',
    tag: 'QUICK GRAB',
    image: '/images/loaded-fries.jpg',
  },
  {
    id: 'pitlane-pizza',
    name: 'PIT LANE MARGHERITA',
    category: 'food',
    price: 18.00,
    originalPrice: 22.50,
    description: 'San Marzano tomato sugo, fresh buffalo mozzarella, fragrant basil on woodfired crust.',
    prepTime: 'Ready in 4 mins',
    tag: 'HOT SELLER',
    image: '/images/pizza.jpg',
    popular: true,
  },
  {
    id: 'craft-lager',
    name: 'CRAFT LAGER 4-PACK',
    category: 'food',
    price: 36.00,
    originalPrice: 44.00,
    description: 'Melbourne micro-brewery cold-stored crisp draught lager (4x 375ml cans). 18+ only.',
    prepTime: 'Instant Express Locker',
    tag: 'ICE COLD',
    image: '/images/beer.jpg',
    popular: true,
  },
  {
    id: 'red-bull',
    name: 'RED BULL ENERGY CAN',
    category: 'food',
    price: 6.50,
    originalPrice: 8.00,
    description: 'Classic Red Bull energy 250ml can, kept chilled at sub-zero temperatures.',
    prepTime: 'Instant Express Locker',
    tag: 'CHILLED',
    image: '/images/redbull.jpg',
  },
  {
    id: 'still-water',
    name: 'MOUNT FRANKLIN WATER',
    category: 'food',
    price: 4.50,
    originalPrice: 5.50,
    description: 'Chilled 600ml Australian spring water for high-heat trackside hydration.',
    prepTime: 'Instant Express Locker',
    tag: 'COLD',
    image: '/images/water.jpg',
  },
  {
    id: 'gp-cap-2026',
    name: '2026 OFFICIAL GP CAP',
    category: 'merch',
    price: 65.00,
    originalPrice: 75.00,
    description: 'Limited edition high-crown snapback with Albert Park track outline embroidery.',
    prepTime: 'Pre-Packaged in Locker',
    tag: 'OFFICIAL 2026',
    image: '/images/cap.jpg',
    popular: true,
  },
  {
    id: 'ferrari-tee',
    name: 'SCUDERIA REPLICA TEE',
    category: 'merch',
    price: 95.00,
    originalPrice: 110.00,
    description: 'Official 2026 Scuderia Ferrari driver edition lightweight breathable jersey (Size L).',
    prepTime: 'Pre-Packaged in Locker',
    tag: 'TEAM MERCH',
    image: '/images/tee.jpg',
  },
  {
    id: 'hi-fi-earplugs',
    name: 'ACOUSTIC EARPLUGS',
    category: 'merch',
    price: 18.00,
    originalPrice: 22.00,
    description: '28dB SNR high-attenuation motorsport hearing protection with lanyard & case.',
    prepTime: 'Instant Express Locker',
    tag: 'TRACKSIDE ESSENTIAL',
    image: '/images/earplugs.jpg',
  },
];
