# Job Scraper

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env` file in the root directory and add the following variable:

```bash
MONGODB_URI=<mongo_db_url>
```

## Features
- Scrape job listings from various sources
- Store job data in MongoDB
- Search and filter job listings
- Responsive UI for browsing job posts

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository_url>
cd job-scraper
npm install
```

## Deployment

To deploy the project, follow these steps:

1. Set up a MongoDB database and obtain the connection URL.
2. Configure the `.env` file with the `MONGODB_URI`.
3. Use a hosting service like Vercel, Netlify, or a VPS.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.