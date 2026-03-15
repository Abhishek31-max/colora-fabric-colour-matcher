import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Fabric, { IFabric } from '@/models/Fabric';
import { hexToRgb, rgbToLab, calculateDeltaE, deltaEToPercentage } from '@/lib/color-utils';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { hex } = await request.json();
    if (!hex) {
      return NextResponse.json({ error: 'HEX color is required' }, { status: 400 });
    }

    await dbConnect();
    const fabrics: IFabric[] = await Fabric.find({});

    const targetRgb = hexToRgb(hex);
    if (!targetRgb) {
      return NextResponse.json({ error: 'Invalid HEX color' }, { status: 400 });
    }

    const targetLab = rgbToLab(targetRgb);

    const matches = fabrics.map(fabric => {
      const fabricRgb = hexToRgb(fabric.hex);
      if (!fabricRgb) return { ...fabric.toObject(), matchPercentage: 0 };

      const fabricLab = rgbToLab(fabricRgb);
      const deltaE = calculateDeltaE(targetLab, fabricLab);
      const matchPercentage = deltaEToPercentage(deltaE);

      return {
        ...fabric.toObject(),
        matchPercentage
      };
    });

    // Sort by match percentage (descending) and return top 6
    const topMatches = matches
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 6);

    return NextResponse.json(topMatches);
  } catch (error: any) {
    console.error('Match Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
