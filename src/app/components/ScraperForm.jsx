'use client';
import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

const supportedHosts = [
  'www.linkedin.com',
  'www.indeed.com',
  'internshala.com'
];

export default function ScraperForm({ onScrape }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const validateUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return supportedHosts.includes(urlObj.hostname);
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsValidating(true);

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (include http:// or https://)\nSupported sites: LinkedIn (linkedin.com/jobs) and Indeed (indeed.com/jobs)');
      setIsValidating(false);
      return;
    }

    setError('');
    try {
      await onScrape(url);
    } catch (err) {
      setError('Failed to start scraping. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="url"
            placeholder="Enter job board URL"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            disabled={isValidating}
            required
          />
          {error && (
            <div className="absolute -bottom-5 left-0 text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <button 
          type="submit" 
          disabled={isValidating}
          className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isValidating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Scraping...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              <span>Scrape Jobs</span>
            </div>
          )}
        </button>
      </form>
      <p className="mt-3 text-sm text-gray-500">
        Supported sites: LinkedIn, Indeed, Glassdoor
      </p>
    </div>
  );
}