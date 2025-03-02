import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import dbConnect from '@/utils/dbConnect';
import Job from '@/models/job';

const jobSites = [
  {
    url: 'https://www.linkedin.com/jobs',
    parentSelector: '.jobs-search__results-list li',
    titleSelector: '.base-search-card__title',
    companySelector: '.base-search-card__subtitle',
    linkSelector: '.base-card__full-link'
  },
  {
    url: 'https://www.indeed.com/jobs',
    parentSelector: '.jobsearch-ResultsList li',
    titleSelector: '.jobTitle',
    companySelector: '.companyName',
    linkSelector: '.jcs-JobTitle'
  }
];

async function scrapData(site) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(site.url);
  const content = await page.content();
  const $ = cheerio.load(content);

  const jobs = [];
  $(site.parentSelector).each((_, element) => {
    const jobTitle = $(element).find(site.titleSelector).text().trim();
    const companyName = $(element).find(site.companySelector).text().trim();
    const jobUrl = $(element).find(site.linkSelector).attr('href');
    
    if (jobTitle && companyName && jobUrl) {
      jobs.push({
        jobTitle,
        companyName,
        url: new URL(jobUrl, site.url).href
      });
    }
  });

  await browser.close();
  return jobs;
}

export async function GET() {
  await dbConnect();

  try {
    for (const site of jobSites) {
      const jobs = await scrapData(site);
      
      // Update database with scraped jobs
      for (const job of jobs) {
        await Job.findOneAndUpdate(
          { jobTitle: job.jobTitle },
          { 
            $addToSet: { 
              listings: {
                companyName: job.companyName,
                url: job.url
              }
            } 
          },
          { upsert: true }
        );
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Job listings updated successfully' 
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}