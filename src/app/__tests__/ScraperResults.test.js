import { render, screen } from '@testing-library/react';
import ScraperResults from '../components/ScraperResults';

describe('ScraperResults Component', () => {
  test('renders loading state', () => {
    render(<ScraperResults results={[]} loading={true} error={null} />);
    // The loading state is indicated by a container with role="loading"
    expect(screen.getByRole('loading')).toBeInTheDocument();
  });

  test('renders error message', () => {
    const errorMessage = 'Failed to fetch jobs';
    render(<ScraperResults results={[]} loading={false} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders job listings correctly', () => {
    const mockResults = [
      { jobTitle: 'Software Engineer', companyName: 'Google', url: 'https://google.com/job1' },
      { jobTitle: 'Data Scientist', companyName: 'Meta', url: 'https://meta.com/job2' }
    ];

    render(<ScraperResults results={mockResults} loading={false} error={null} />);
    
    // Check header and listing details
    expect(screen.getByText('Scraped Job Listings')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Data Scientist')).toBeInTheDocument();
    expect(screen.getByText('Meta')).toBeInTheDocument();
  });

  test('renders external links correctly', () => {
    const mockResults = [
      { jobTitle: 'Frontend Developer', companyName: 'Amazon', url: 'https://amazon.com/job3' }
    ];

    render(<ScraperResults results={mockResults} loading={false} error={null} />);
    
    // The ExternalLink icon should be wrapped in a link element
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://amazon.com/job3');
    expect(link).toHaveAttribute('target', '_blank');
  });

  test('does not render job listings if results are empty', () => {
    render(<ScraperResults results={[]} loading={false} error={null} />);
    
    // The header "Scraped Job Listings" should not appear if there are no results
    expect(screen.queryByText('Scraped Job Listings')).not.toBeInTheDocument();
  });
});
