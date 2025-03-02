'use client';

export default function ScraperResults({ results, loading, error }) {
  return (
    <div className="w-full max-w-3xl mt-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Scraped Results:
      </h2>
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {results.map((result, index) => (
          <li key={index} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <span className="font-bold">{result.jobTitle}</span> — {result.companyName}
          </li>
        ))}
      </ul>
    </div>
  );
}
