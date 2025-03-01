'use client';
import { useState } from 'react';
import ScraperForm from './components/ScraperForm';
import ScraperResults from './components/ScraperResults';

export default function ScraperPage() {
  const [results, setResults] = useState([]);

  const handleScrape = async (url) => {
    try {
      const res = await axios(`/api/scrape?url=${encodeURIComponent(url)}`);
      setResults(res.data.results);
    } catch (error) {
      console.error('Error scraping:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
        Web Scraper
      </h1>
      <ScraperForm onScrape={handleScrape} />
      {results.length > 0 && (
        <ScraperResults results={results} />
      )}
    </div>
  );
}
