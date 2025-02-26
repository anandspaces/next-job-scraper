'use client';
import { useState } from 'react';
import ScraperForm from './components/ScraperForm';
import ScraperResults from './components/ScraperResults';

export default function ScraperPage() {
  const [results, setResults] = useState([]);

  const handleScrape = async (url) => {
    try {
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error scraping:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Web Scraper</h1>
      <ScraperForm onScrape={handleScrape} />
      <ScraperResults results={results} />
    </div>
  );
}
