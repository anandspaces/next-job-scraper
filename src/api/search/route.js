import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Job from '@/models/job';

export async function GET(req) {
  await dbConnect();

  try {
    const search = req.nextUrl.searchParams.get('query');
    if (!search) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const searchResults = await Job.find({
      jobTitle: { $regex: search, $options: 'i' }
    }).select('jobTitle listings -_id');

    return NextResponse.json({ success: true, results: searchResults });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}