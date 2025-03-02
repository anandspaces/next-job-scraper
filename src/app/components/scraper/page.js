'use client';
import { useState } from 'react';
import ScraperForm from './components/ScraperForm';
import ScraperResults from './components/ScraperResults';

export default function ScraperPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
        Web Scraper
      </h1>
      <ScraperForm onScrape={handleScrape} />
      <ScraperResults results={results} loading={loading} error={error} />
    </div>
  );
}
