import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../SearchForm';

describe('SearchForm Component', () => {
  test('renders input field and search button', () => {
    render(<SearchForm onSearch={jest.fn()} loading={false} />);

    expect(screen.getByPlaceholderText(/Enter job title/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates input value when typing', () => {
    render(<SearchForm onSearch={jest.fn()} loading={false} />);

    const input = screen.getByPlaceholderText(/Enter job title/i);
    fireEvent.change(input, { target: { value: 'Software Engineer' } });

    expect(input).toHaveValue('Software Engineer');
  });

  test('displays an error when submitting an empty input', () => {
    render(<SearchForm onSearch={jest.fn()} loading={false} />);

    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText(/please enter a job title to search/i)).toBeInTheDocument();
  });

  test('clears error when typing after an empty submission', () => {
    render(<SearchForm onSearch={jest.fn()} loading={false} />);

    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText(/please enter a job title to search/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/Enter job title/i), { target: { value: 'Frontend Developer' } });

    expect(screen.queryByText(/please enter a job title to search/i)).not.toBeInTheDocument();
  });

  test('calls onSearch with input value when submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter job title/i), { target: { value: 'Backend Developer' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(mockOnSearch).toHaveBeenCalledWith('Backend Developer');
  });

  test('disables the search button when loading', () => {
    render(<SearchForm onSearch={jest.fn()} loading={true} />);

    const button = screen.getByRole('button', { name: /searching/i });
    expect(button).toBeDisabled();
  });

  test('search button displays "Searching..." when loading', () => {
    render(<SearchForm onSearch={jest.fn()} loading={true} />);

    expect(screen.getByText(/searching/i)).toBeInTheDocument();
  });
});
