import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Fabric from '@/models/Fabric';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const fabrics = await Fabric.find({}).sort({ createdAt: -1 }).limit(10);
    console.log(`API: Successfully fetched ${fabrics.length} fabrics.`);
    return NextResponse.json(fabrics);
  } catch (error: any) {
    console.error('API Error (fabrics):', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
