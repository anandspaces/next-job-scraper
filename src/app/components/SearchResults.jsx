'use client';
import { Briefcase, Building, ExternalLink, AlertCircle } from 'lucide-react';

export default function SearchResults({ results, loading, error }) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.length > 0 ? (
        results.map((result) => (
          <div key={result.jobTitle} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" />
              {result.jobTitle}
            </h3>
            <div className="space-y-4">
              {result.listings.map((listing) => (
                <div key={listing.url} className="border-l-4 border-blue-200 pl-4">
                  <p className="text-gray-600 font-medium mb-1 flex items-center gap-2">
                    <Building className="w-5 h-5 text-gray-400" />
                    {listing.companyName}
                  </p>
                  <a
                    href={listing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-words flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {listing.url}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        !loading && <p className="text-gray-600">No results found</p>
      )}
    </div>
  );
}