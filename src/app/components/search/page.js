'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Find Job Listings by Title
        </h1>
        
        <form onSubmit={handleSearch} className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter job title (e.g. 'Frontend Developer')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </form>

        {loading && <p className="text-gray-600">Searching job listings...</p>}
        
        <div className="space-y-6">
          {results.map((result, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {result.jobTitle}
              </h3>
              <div className="space-y-4">
                {result.listings.map((listing, listingIndex) => (
                  <div key={listingIndex} className="border-l-4 border-blue-200 pl-4">
                    <p className="text-gray-600 font-medium mb-1">
                      {listing.companyName}
                    </p>
                    <a 
                      href={listing.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-words"
                    >
                      {listing.url}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {!loading && results.length === 0 && query && (
            <p className="text-gray-600">No results found for "{query}"</p>
          )}
        </div>
      </div>
    </div>
  );
}