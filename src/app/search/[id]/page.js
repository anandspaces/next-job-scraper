'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';

export default function JobDetailPage({ params }) {
  const resolvedParams = use(params); // unwrap the promise
  const jobId = resolvedParams.id;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:3001/jobs/${jobId}`);
        if (!res.ok) throw new Error('Failed to fetch job details');
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!job) return <p className="text-center text-gray-500">Job not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{job.jobTitle}</h1>
        <p className="text-lg text-gray-600 mb-2">{job.companyName}</p>
        <a
          href={`https://${job.site}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          {job.site}
        </a>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Back
          </button>
          <a
            href={`https://${job.site}${job.link}`}
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}
