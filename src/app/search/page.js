'use client';
import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a job title to search.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:3001/search?search=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Failed to fetch results');
      const data = await res.json();
      console.log(data);
      setResults(data);
    } catch (err) {
      setError(err.message || 'An error occurred while searching.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    router.push(`/search/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Find Job Listings by Title</h1>

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

        <div className="space-y-6">
          {results.map((result) => (
            <div
              key={result._id}
              onClick={() => handleCardClick(result._id)}
              className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{result.jobTitle}</h3>
              <p className="text-gray-600">{result.companyName}</p>
              <a
                href={result.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {result.site}
              </a>
            </div>
          ))}
        </div>

        {!loading && results.length <= 0 && query && !error && (
          <p className="text-gray-600">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
}

//New Page

// 'use client';
// import { useState } from 'react';
// import SearchForm from '../components/SearchForm';
// import SearchResults from '../components/SearchResults';

// export default function SearchPage() {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSearch = async (query) => {
//     setLoading(true);
//     setError('');
//     try {
//       // const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
//       const res = await fetch(`http://localhost:3001/search?search=${encodeURIComponent(query)}`);
//       if (!res.ok) throw new Error('Failed to fetch results');
//       const data = await res.json();
//       console.log(data);
//       setResults(data);
//       // setResults(data.results);
//     } catch (err) {
//       setError(err.message || 'An error occurred while searching.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           Find Job Listings by Title
//         </h1>
//         <SearchForm onSearch={handleSearch} loading={loading} />
//         <SearchResults results={results} loading={loading} error={error} />
//       </div>
//     </div>
//   );
// }