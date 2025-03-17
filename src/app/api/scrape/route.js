import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import dbConnect from '@/utils/dbConnect';
import Job from '@/models/job';

const jobSites = [
  {
    url: 'https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0',
    loginRequired: false,
    parentSelector: '.jobs-search__results-list',
    titleSelector: '.base-search-card__title',
    companySelector: '.hidden-nested-link',
    linkSelector: '.base-card__full-link'
  },
  {
    url: 'https://www.indeed.com/jobs',
    parentSelector: '.jobsearch-ResultsList li',
    titleSelector: '.jobTitle',
    companySelector: '.companyName',
    linkSelector: '.jcs-JobTitle'
  },
  {
    url: 'https://internshala.com/jobs//',
    parentSelector: '.company',
    titleSelector: '.job-title-href',
    companySelector: '.company-name'
}
];

async function scrapData(site) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'accept-language': 'en-US,en;q=0.9',
    });

    // Bypass bot detection
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });

    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Handle LinkedIn login requirement
    if (site.loginRequired) {
      await page.waitForSelector('.modal__dismiss', { timeout: 5000 });
      throw new Error('LinkedIn requires manual login for scraping');
    }

    // Wait for job results
    await page.waitForSelector(site.parentSelector, { timeout: 30000 });

    // Scroll to load more jobs
    await autoScroll(page);
    
    const content = await page.content();
    const $ = load(content);

    const jobs = [];
    $(site.parentSelector).each((element) => {
      const jobTitle = $(element).find(site.titleSelector).text().trim();
      const companyName = $(element).find(site.companySelector).text().trim();
      // const jobUrl = $(element).find(site.linkSelector).attr('href');
      
      if (jobTitle && companyName && jobUrl) {
        // const formattedUrl = jobUrl.startsWith('http') ? jobUrl : new URL(jobUrl, site.url).href;
        jobs.push({
          jobTitle,
          companyName,
          // url: new URL(jobUrl, site.url).href
          // url: formattedUrl
        });
      }
    });

    return jobs;
  } catch (error) {
    console.error(`Scraping error: ${error}`);
    throw new Error(`Failed to scrape ${site.url}: ${error.message}`);
  } finally {
    // if (browser) await browser.close();
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

export async function GET(request) {
  await dbConnect();

  try {
    const urlParam = request.nextUrl.searchParams.get('url');
    if (!urlParam) {
      return NextResponse.json(
        { success: false, error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // Find matching site configuration
    const targetSite = jobSites.find(site => {
      try {
        const siteHost = new URL(site.url).hostname;
        const paramHost = new URL(urlParam).hostname;
        return siteHost === paramHost;
      } catch {
        return false;
      }
    });

    if (!targetSite) {
      return NextResponse.json(
        { success: false, error: 'Unsupported website' },
        { status: 400 }
      );
    }

    const jobs = await scrapData(targetSite);

    // Database update logic remains the same
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


    return NextResponse.json({ 
      success: true, 
      message: 'Job listings updated successfully' ,
      jobs: {
        jobs,websiteScraped: targetSite.url.split('/')[2]
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}