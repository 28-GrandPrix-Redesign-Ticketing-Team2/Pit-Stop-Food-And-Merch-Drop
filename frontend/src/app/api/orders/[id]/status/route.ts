import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Order ID is required' },
      { status: 400 }
    );
  }

  // Realistic mock order status lookup
  const mockOrder = {
    orderId: id.toUpperCase(),
    pinCode: id.replace('GP-', '') || '8821',
    status: 'READY_FOR_PICKUP',
    station: {
      id: 'M2',
      name: 'Pit Stop M2 (Turn 9 East)',
      lockerNumber: '#04',
      walkTimeMins: 2,
    },
    raceAlert: {
      active: true,
      condition: 'Safety Car Active (Lap 24)',
      window: 'Turn 9 optimal pickup window open',
    },
    qrPayload: `AUSGP-2026-PITSTOP-PASS-${id}-M2-04`,
    estimatedCollectionSecondsRemaining: 180,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    data: mockOrder,
  });
}
