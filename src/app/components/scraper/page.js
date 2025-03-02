'use client';
import { useState } from 'react';
import ScraperForm from './components/ScraperForm';
import ScraperResults from './components/ScraperResults';
import { Info } from 'lucide-react';

export default function ScraperPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const handleScrape = async (url) => {
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Error scraping data');

      setResults(data.jobs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearResults = () => {
    setResults([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Job Scraper Dashboard
          </h1>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 text-gray-500 hover:text-gray-700 transition"
          >
            <Info className="w-6 h-6" />
          </button>
        </div>

        {showInfo && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-700">
              Enter a job board URL to scrape job listings. The scraper will extract
              job titles, company names, and URLs. Supported sites include LinkedIn,
              Indeed, and more. Results will be displayed below and automatically
              saved to the database.
            </p>
          </div>
        )}

        <ScraperForm onScrape={handleScrape} />

        <div className="mt-8 flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Scraping Results
          </h2>
          {results.length > 0 && (
            <button
              onClick={handleClearResults}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Clear Results
            </button>
          )}
        </div>

        <ScraperResults 
          results={results} 
          loading={loading} 
          error={error} 
        />

        {results.length > 0 && (
          <div className="mt-6 text-sm text-gray-500">
            Found {results.length} job listings
          </div>
        )}
      </div>
    </div>
  );
}