'use client';
import { useState } from 'react';

export default function ScraperForm({ onScrape }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onScrape(url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4">
      <input
        type="url"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="px-4 py-2 w-full max-w-md border rounded"
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        Scrape
      </button>
    </form>
  );
}
