import './globals.css';

export const metadata = {
  title: 'Job Scraper App',
  description: 'Scrape Jobs easily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
