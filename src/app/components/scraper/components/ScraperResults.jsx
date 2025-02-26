'use client';

export default function ScraperResults({ results }) {
  return (
    <div className="w-full max-w-3xl mt-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Scraped Results:
      </h2>
      <ul className="space-y-4">
        {results.map((result, index) => (
          <li 
            key={index} 
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
          >
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
}
