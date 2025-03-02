import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import dbConnect from '@/utils/dbConnect';
import Job from '@/models/Job';

export async function GET(req) {
  await dbConnect();

  const url = req.nextUrl.searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });

  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    const $ = cheerio.load(content);

    const jobs = [];
    $('.jobCard').each((index, element) => {
      const jobTitle = $(element).find('.jobTitle').text().trim();
      const companyName = $(element).find('.companyName').text().trim();
      jobs.push({ jobTitle, companyName });
    });

    await browser.close();

    // Save to MongoDB
    await Job.insertMany(jobs);

    return NextResponse.json({ jobs });
  } catch (error) {
    return NextResponse.json({ error: 'Scraping failed' }, { status: 500 });
  }
}
