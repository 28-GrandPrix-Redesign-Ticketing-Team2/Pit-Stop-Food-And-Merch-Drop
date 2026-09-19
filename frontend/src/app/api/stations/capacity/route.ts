import { NextResponse } from 'next/server';
import { VIEWING_LOCATIONS } from '@/data/dropPoints';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const viewingAreaId = searchParams.get('areaId');

  if (viewingAreaId) {
    const matched = VIEWING_LOCATIONS.find((loc) => loc.id === viewingAreaId);
    if (!matched) {
      return NextResponse.json(
        { success: false, error: `Viewing area '${viewingAreaId}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      viewingArea: matched.name,
      turn: matched.turn,
      stations: matched.dropPoints,
      recommendedStation: matched.dropPoints.find((dp) => dp.status === 'fastest') || matched.dropPoints[0],
      timestamp: new Date().toISOString(),
    });
  }

  // If no areaId passed, return all drop stations across circuit
  const allStations = VIEWING_LOCATIONS.flatMap((loc) =>
    loc.dropPoints.map((dp) => ({
      ...dp,
      viewingArea: loc.name,
      turn: loc.turn,
    }))
  );

  return NextResponse.json({
    success: true,
    totalStations: allStations.length,
    circuitSession: 'Practice 3 (P3)',
    timestamp: new Date().toISOString(),
    stations: allStations,
  });
}
