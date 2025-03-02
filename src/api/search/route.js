import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Job from '@/models/Job';

export async function GET(req) {
  await dbConnect();

  const search = req.nextUrl.searchParams.get('query');
  const searchResults = await Job.find({ jobTitle: { $regex: search, $options: 'i' } });

  return NextResponse.json({ jobs: searchResults });
}
