import { NextResponse } from 'next/server';

interface CheckoutRequest {
  orderId: string;
  paymentMethod: 'apple_pay' | 'google_pay' | 'credit_card' | 'grand_prix_points';
  amount: number;
  currency?: string;
  pointsRedeemed?: number;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequest;
    const { orderId, paymentMethod, amount, currency = 'AUD', pointsRedeemed = 0 } = body;

    if (!orderId || !amount) {
      return NextResponse.json(
        { success: false, error: 'orderId and amount are required' },
        { status: 400 }
      );
    }

    // Mock instant payment authorization for race express flow
    const transactionId = `TXN-GP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      success: true,
      message: 'Payment authorized successfully',
      data: {
        transactionId,
        orderId,
        amountCharged: amount,
        currency,
        paymentMethod,
        pointsRedeemed,
        status: 'PAID',
        receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Payment authorization failed' },
      { status: 500 }
    );
  }
}
