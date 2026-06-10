# GitHub Profile Analyzer API

## Overview

A Node.js and Express.js backend application that analyzes GitHub user profiles using the GitHub Public API and stores useful insights in a MySQL database.

## Features

* Analyze GitHub profiles by username
* Store profile insights in MySQL
* Fetch all analyzed profiles
* Fetch a single analyzed profile
* Refresh existing profile data
* Calculate profile score based on repositories, followers, and stars
* Store repository statistics such as total stars and forks

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub Public API
* Axios
* mysql2

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd github-profile-analyzer
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer
```

### Create Database

Run the SQL script located in:

```text
database/schema.sql
```

### Start Server

```bash
npm run dev
```

Server runs at:

```text
http://localhost:5000
```

## Database Schema

The schema is available in:

```text
database/schema.sql
```

## API Endpoints

### Analyze Profile

```http
POST /api/profiles/:username
```

Example:

```http
POST /api/profiles/octocat
```

### Get All Profiles

```http
GET /api/profiles
```

### Get Single Profile

```http
GET /api/profiles/:username
```

### Refresh Profile

```http
PUT /api/profiles/:username/refresh
```

### Get Top Profiles

```http
GET /api/profiles/top
```

## Repository

GitHub Repository:

https://github.com/saikiran20/github-profile-analyzer

## Postman Collection

(Optional) Include exported Postman collection in the repository.
