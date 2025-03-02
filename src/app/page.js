import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to JobScraper Pro
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your all-in-one solution for job market insights. Scrape job listings, search opportunities, and track your career prospects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/scraper">
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                🕷️ Start Scraping
              </h2>
              <p className="text-gray-600">
                Collect fresh job listings from multiple sources
              </p>
            </div>
          </Link>
          
          <Link href="/search">
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                🔍 Search Jobs
              </h2>
              <p className="text-gray-600">
                Find opportunities by job title or company
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>Built with Next.js, MongoDB, and Puppeteer</p>
          <p>Your gateway to smarter job searching</p>
        </div>
      </div>
    </main>
  );
}