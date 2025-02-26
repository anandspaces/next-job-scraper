'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function ScraperForm({ onScrape }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onScrape(url);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-lg flex items-center gap-4 mb-8"
    >
      <input
        type="url"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400 transition"
        required
      />
      <button 
        type="submit" 
        className="flex items-center justify-center bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}
