export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Dummy data for testing
  const results = [
    'Example result 1',
    'Example result 2',
    'Example result 3',
  ];

  res.status(200).json({ results });
}
