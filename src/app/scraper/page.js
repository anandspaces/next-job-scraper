'use client';
import { useState } from 'react';
import ScraperForm from './components/ScraperForm';
import ScraperResults from './components/ScraperResults';
import { Info, AlertCircle } from 'lucide-react';

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
      if (!res.ok) throw new Error('Failed to scrape data');
      const data = await res.json();
      setResults(data.jobs);
    } catch (err) {
      setError(err.message || 'An error occurred while scraping.');
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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-600">{error}</p>
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