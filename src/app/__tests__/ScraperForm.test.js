import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ScraperForm from '../ScraperForm';

describe('ScraperForm Component', () => {
  let mockOnScrape;

  beforeEach(() => {
    mockOnScrape = jest.fn();
    render(<ScraperForm onScrape={mockOnScrape} />);
  });

  test('renders input field and submit button', () => {
    expect(screen.getByPlaceholderText(/Enter job board URL/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Scrape Jobs/i })).toBeInTheDocument();
  });

  test('does not show error message initially', () => {
    expect(screen.queryByText(/Please enter a valid URL/i)).not.toBeInTheDocument();
  });

  test('shows error for invalid URL', async () => {
    const input = screen.getByPlaceholderText(/Enter job board URL/i);
    const button = screen.getByRole('button', { name: /Scrape Jobs/i });

    fireEvent.change(input, { target: { value: 'invalid-url' } });
    fireEvent.click(button);

    expect(await screen.findByText(/Please enter a valid URL/i)).toBeInTheDocument();
  });

  test('accepts a valid URL and calls onScrape', async () => {
    const input = screen.getByPlaceholderText(/Enter job board URL/i);
    const button = screen.getByRole('button', { name: /Scrape Jobs/i });

    fireEvent.change(input, { target: { value: 'https://www.linkedin.com/jobs' } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(mockOnScrape).toHaveBeenCalledWith('https://www.linkedin.com/jobs')
    );
  });

  test('disables submit button while validating', async () => {
    const input = screen.getByPlaceholderText(/Enter job board URL/i);
    const button = screen.getByRole('button', { name: /Scrape Jobs/i });

    fireEvent.change(input, { target: { value: 'https://www.indeed.com/jobs' } });
    fireEvent.click(button);

    // Immediately check that the button is disabled
    expect(button).toBeDisabled();
    await waitFor(() => expect(mockOnScrape).toHaveBeenCalled());
  });

  test('handles API failure gracefully', async () => {
    // Update the mock to simulate a failure
    mockOnScrape.mockRejectedValue(new Error('Failed to scrape'));

    const input = screen.getByPlaceholderText(/Enter job board URL/i);
    const button = screen.getByRole('button', { name: /Scrape Jobs/i });

    fireEvent.change(input, { target: { value: 'https://www.indeed.com/jobs' } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText(/Failed to start scraping/i)).toBeInTheDocument()
    );
  });

  test('displays loading state when submitting', async () => {
    // Use a delayed promise to simulate loading state
    const delayedOnScrape = () => new Promise((resolve) => setTimeout(resolve, 1000));
    // Re-render the component with delayedOnScrape
    render(<ScraperForm onScrape={delayedOnScrape} />);
    
    const input = screen.getByPlaceholderText(/Enter job board URL/i);
    fireEvent.change(input, { target: { value: 'https://www.linkedin.com/jobs' } });
    fireEvent.submit(screen.getByRole('button', { name: /Scrape Jobs/i }));
    
    expect(screen.getByText(/Scraping.../i)).toBeInTheDocument();
  });
});
