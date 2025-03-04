import { render, screen } from '@testing-library/react';
import ScraperResults from '../components/ScraperResults';

describe('ScraperResults Component', () => {
  test('renders loading state', () => {
    render(<ScraperResults results={[]} loading={true} error={null} />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error message when an error occurs', () => {
    render(<ScraperResults results={[]} loading={false} error="Failed to fetch data" />);
    
    expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
  });

  test('renders job listings correctly', () => {
    const mockResults = [
      {
        jobTitle: 'Software Engineer',
        companyName: 'Tech Corp',
        url: 'https://www.example.com/job1',
      },
      {
        jobTitle: 'Frontend Developer',
        companyName: 'Web Solutions',
        url: 'https://www.example.com/job2',
      },
    ];

    render(<ScraperResults results={mockResults} loading={false} error={null} />);

    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Web Solutions/i)).toBeInTheDocument();
  });

  test('renders external links correctly', () => {
    const mockResults = [
      {
        jobTitle: 'Backend Developer',
        companyName: 'Cloud Inc.',
        url: 'https://www.example.com/job3',
      },
    ];

    render(<ScraperResults results={mockResults} loading={false} error={null} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://www.example.com/job3');
    expect(link).toHaveAttribute('target', '_blank');
  });

  test('does not render job listings if results are empty', () => {
    render(<ScraperResults results={[]} loading={false} error={null} />);
    
    expect(screen.queryByText(/Scraped Job Listings/i)).not.toBeInTheDocument();
  });
});
