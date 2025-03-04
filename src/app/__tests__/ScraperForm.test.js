import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ScraperForm from '../components/ScraperForm';

describe('ScraperForm Component', () => {
  const mockOnScrape = jest.fn();

  beforeEach(() => {
    mockOnScrape.mockClear();
  });

  test('renders input and button correctly', () => {
    render(<ScraperForm onScrape={mockOnScrape} />);
    
    expect(screen.getByPlaceholderText(/Enter job board URL/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Scrape Jobs/i })).toBeInTheDocument();
  });

  test('displays an error when an invalid URL is entered', async () => {
    render(<ScraperForm onScrape={mockOnScrape} />);
    
    const input = screen.getByPlaceholderText(/Enter job board URL/i);
    fireEvent.change(input, { target: { value: 'invalid-url' } });

    fireEvent.submit(screen.getByRole('button', { name: /Scrape Jobs/i }));

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid URL/i)).toBeInTheDocument();
    });
  });

  test('submits a valid URL and calls onScrape', async () => {
    render(<ScraperForm onScrape={mockOnScrape} />);
    
    const input = screen.getByPlaceholderText(/Enter job board URL/i);
    fireEvent.change(input, { target: { value: 'https://www.linkedin.com/jobs' } });

    fireEvent.submit(screen.getByRole('button', { name: /Scrape Jobs/i }));

    await waitFor(() => {
      expect(mockOnScrape).toHaveBeenCalledWith('https://www.linkedin.com/jobs');
    });
  });

  test('displays loading state when submitting', async () => {
    render(<ScraperForm onScrape={() => new Promise((resolve) => setTimeout(resolve, 1000))} />);
    
    fireEvent.change(screen.getByPlaceholderText(/Enter job board URL/i), {
      target: { value: 'https://www.linkedin.com/jobs' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Scrape Jobs/i }));

    expect(screen.getByText(/Scraping.../i)).toBeInTheDocument();
  });
});
