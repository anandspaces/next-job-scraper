'use client';
import { useState } from 'react';
import { Search, AlertCircle,Briefcase, Building, Globe } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a job title to search.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const res = await fetch(`http://localhost:3001/search?search=${query}`);
      if (!res.ok) throw new Error('Failed to fetch results');
      const data = await res.json();
      setResults(data);
      // setResults(data.results);
      console.log(data);
    } catch (err) {
      setError(err.message || 'An error occurred while searching.');
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
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-70"
          >
            <Search className="w-5 h-5" />
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {loading && (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        )}

        {/* {!loading && results.length > 0 && (
          <div className="space-y-6">
            {results.map((result, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {result.jobTitle}
                </h3>
                <p className="text-gray-600">{result.companyName}</p>
                <p className="text-gray-600">{result.site}</p>
              </div>
            ))}
          </div>
        )} */}
        {!loading && results.length > 0 && (
  <div className="space-y-6">
    {results.map((result, index) => (
      <div
        key={index}
        className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <Briefcase className="h-6 w-6 text-blue-600" />
          {result.jobTitle}
        </h3>
        <p className="text-lg text-gray-700 font-medium flex items-center gap-2">
          <Building className="h-5 w-5 text-gray-500" />
          {result.companyName}
        </p>
        <p className="text-gray-600 flex items-center gap-2 mt-1">
          <Globe className="h-5 w-5 text-gray-500" />
          <a
            href={result.site}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {result.site}
          </a>
        </p>
      </div>
    ))}
  </div>
)}


        {!loading && results.length === 0 && query && !error && (
          <p className="text-gray-600">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
}