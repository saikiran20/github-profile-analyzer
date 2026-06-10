# GitHub Profile Analyzer

A Node.js application to analyze GitHub user profiles and retrieve insights about developers.

## Features

- Analyze GitHub user profiles
- Retrieve user profile information
- Manage multiple profiles
- Refresh profile data
- Get top profiles

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your database credentials

## Usage

Start the development server:
```bash
npm run dev
```

The server will run on the port specified in your `.env` file (default: 5000).

## API Endpoints

- `POST /profiles/:username` - Analyze a GitHub profile
- `GET /profiles` - Get all profiles
- `GET /profiles/top` - Get top profiles
- `GET /profiles/:username` - Get profile details
- `PUT /profiles/:username/refresh` - Refresh profile data

## Project Structure

```
src/
├── config/
│   └── db.js
├── controllers/
│   └── githubController.js
├── services/
│   └── githubService.js
├── routes/
│   └── githubRoutes.js
├── app.js
└── server.js
```

## License

MIT
