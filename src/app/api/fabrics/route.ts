import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Fabric from '@/models/Fabric';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const fabrics = await Fabric.find({}).sort({ createdAt: -1 }).limit(10);
    return NextResponse.json(fabrics);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
