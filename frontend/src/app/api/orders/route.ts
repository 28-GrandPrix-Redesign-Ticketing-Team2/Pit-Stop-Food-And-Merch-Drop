import { NextResponse } from 'next/server';

interface OrderItemRequest {
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface CreateOrderRequest {
  items: OrderItemRequest[];
  stationId: string;
  isGroupOrder?: boolean;
  ticketCode?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderRequest;
    const { items, stationId, isGroupOrder = false, ticketCode = 'GP-3820-X' } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    // Subtotal math
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    // 20% EatClub Dynamic Discount
    const discountAmount = Number((subtotal * 0.20).toFixed(2));
    const total = Number((subtotal - discountAmount).toFixed(2));

    // Generate random 4-digit PIN code matching Figma Section 08
    const pinCode = String(Math.floor(1000 + Math.random() * 9000));
    const orderId = `GP-${pinCode}`;
    const lockerCounter = `#0${Math.floor(1 + Math.random() * 8)}`;
    const qrPayload = `AUSGP-2026-PITSTOP-PASS-${orderId}-${stationId || 'M2'}-${lockerCounter}`;

    const orderData = {
      orderId,
      pinCode,
      status: 'READY_FOR_PICKUP',
      ticketCode,
      isGroupOrder,
      items,
      subtotal,
      discountAmount,
      discountRate: '20% OFF (EatClub Trackside Active)',
      total,
      loyaltyPointsEarned: Math.round(total * 2),
      pickupStation: {
        id: stationId || 'M2',
        name: 'Pit Stop M2 (Turn 9 East)',
        counterNumber: lockerCounter,
        walkTimeMins: 2,
        holdExpirySeconds: 240, // 4-minute reserved locker window
      },
      qrPayload,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Order created and express locker reserved',
      order: orderData,
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process order creation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    orders: [
      {
        orderId: 'GP-8821',
        pinCode: '8821',
        status: 'READY_FOR_PICKUP',
        stationId: 'M2',
        locker: '#04',
        total: 42.00,
        createdAt: new Date(Date.now() - 60000).toISOString(),
      },
    ],
  });
}
