import { NextResponse } from 'next/server';

export interface VerifyTicketRequest {
  ticketCode: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VerifyTicketRequest;
    const { ticketCode } = body;

    if (!ticketCode) {
      return NextResponse.json(
        { success: false, error: 'Ticket code is required' },
        { status: 400 }
      );
    }

    const cleanCode = ticketCode.trim().toUpperCase();

    // Default mock verified ticket (matches Figma: GP-3820-X)
    const isValid = cleanCode.startsWith('GP-') || cleanCode === 'GP-3820-X';

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired Australian Grand Prix ticket reference' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ticketCode: cleanCode,
        verified: true,
        holderName: 'Egor Zvyagin',
        ticketType: '4-Day Grandstand Pass',
        viewingArea: {
          grandstand: 'Clark Grandstand',
          turn: 'Turn 9',
          seat: 'Row H, Seat 14',
          nearestGate: 'Gate 3 (Canterbury Rd)',
          recommendedDropStation: 'M2',
        },
        loyaltyTier: 'VIP Fan',
        loyaltyPoints: 1850,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal ticket verification error' },
      { status: 500 }
    );
  }
}
