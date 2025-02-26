import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
        Welcome to the Job Scraper App
      </h1>
      <Link href="/scraper">
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition">
          Start Scraping
        </button>
      </Link>
    </main>
  );
}
