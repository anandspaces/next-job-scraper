import { render, screen } from '@testing-library/react';
import SearchResults from '../components/SearchResults';

describe('SearchResults Component', () => {
  test('renders loading state with skeleton loaders', () => {
    render(<SearchResults results={[]} loading={true} error={null} />);

    // Expect three skeleton loaders (divs with animate-pulse)
    const loaders = screen.getAllByRole('presentation');
    expect(loaders).toHaveLength(3);
  });

  test('renders error message when an error occurs', () => {
    const errorMessage = 'Failed to fetch jobs';
    render(<SearchResults results={[]} loading={false} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders job listings correctly', () => {
    const mockResults = [
      {
        jobTitle: 'Software Engineer',
        listings: [
          { companyName: 'Google', url: 'https://google.com/job1' },
          { companyName: 'Microsoft', url: 'https://microsoft.com/job2' },
        ],
      },
      {
        jobTitle: 'Data Scientist',
        listings: [
          { companyName: 'Facebook', url: 'https://facebook.com/job3' },
        ],
      },
    ];

    render(<SearchResults results={mockResults} loading={false} error={null} />);

    // Check job titles
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Data Scientist')).toBeInTheDocument();

    // Check company names
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Microsoft')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();

    // Check external links
    expect(screen.getByText('https://google.com/job1')).toHaveAttribute('href', 'https://google.com/job1');
    expect(screen.getByText('https://microsoft.com/job2')).toHaveAttribute('href', 'https://microsoft.com/job2');
    expect(screen.getByText('https://facebook.com/job3')).toHaveAttribute('href', 'https://facebook.com/job3');
  });

  test('renders external links with correct attributes', () => {
    const mockResults = [
      {
        jobTitle: 'Backend Developer',
        listings: [
          { companyName: 'Amazon', url: 'https://amazon.com/job4' },
        ],
      },
    ];

    render(<SearchResults results={mockResults} loading={false} error={null} />);

    const link = screen.getByRole('link', { name: /https:\/\/amazon.com\/job4/i });
    expect(link).toHaveAttribute('href', 'https://amazon.com/job4');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('displays "No results found" when results are empty', () => {
    render(<SearchResults results={[]} loading={false} error={null} />);
    
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });

  test('does not render job listings if results are empty', () => {
    render(<SearchResults results={[]} loading={false} error={null} />);

    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });
});
