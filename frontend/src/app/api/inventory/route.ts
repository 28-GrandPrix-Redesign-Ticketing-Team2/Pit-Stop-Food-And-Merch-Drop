import { NextResponse } from 'next/server';
import { MENU_ITEMS } from '@/data/menu';

export async function GET() {
  const inventory = MENU_ITEMS.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    inStock: true,
    availableUnits: item.category === 'food' ? 65 : 28,
    prepTime: item.prepTime,
    lastUpdated: new Date().toISOString(),
  }));

  return NextResponse.json({
    success: true,
    count: inventory.length,
    timestamp: new Date().toISOString(),
    circuitStatus: 'GREEN_FLAG',
    inventory,
  });
}
