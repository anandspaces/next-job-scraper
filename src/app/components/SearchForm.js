'use client';
import { Search, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function SearchForm({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a job title to search.');
      return;
    }
    setError('');
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Enter job title..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError('');
          }}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        {error && (
          <div className="absolute -bottom-6 left-0 text-red-500 text-sm flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-70"
      >
        <Search className="w-5 h-5" />
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}