export default function ScraperResults({ results }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Scraped Results</h2>
      <ul className="list-disc list-inside">
        {results.length > 0 ? (
          results.map((item, index) => (
            <li key={index} className="text-gray-800">
              {item}
            </li>
          ))
        ) : (
          <p>No results yet. Start scraping!</p>
        )}
      </ul>
    </div>
  );
}
