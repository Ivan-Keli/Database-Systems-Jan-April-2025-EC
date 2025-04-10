# Educational Resource Distribution System

A database management system for tracking and managing the distribution of educational materials to schools, supporting SDG 4: Quality Education.

## Project Overview

This application helps manage the distribution of educational resources such as learning materials, books, and laptops to schools, with a focus on ensuring equitable access. It allows tracking of supplies, holding stakeholders accountable, and generating reports on distribution trends.

### Key Features

- School management
- Resource tracking
- Supplier management
- Distribution tracking
- Visual reporting dashboards
- Data export functionality

## Technology Stack

- **Frontend**: React, Material-UI, Chart.js
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **ORM**: Sequelize

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:

git clone <repository-url>
create a location C:\Projects\Education
cd education

2. Install dependencies:

npm run install-all

3. Configure environment variables:

cp .env.example .env

Edit the `.env` file with your database credentials.

4. Set up the database:

Create the database
psql -U postgres -f database/init.sql

Create tables
psql -U postgres -d education_db -f database/database-schema.sql

5. Start the development server:

Open cmd or terminal and move to directory
cd C:\Projects\Education>

Run
npm run dev


The application will be available at http://localhost:3000.

## Project Structure

- `client/`: React frontend application
- `server/`: Node.js/Express backend API
- `database/`: SQL scripts for database setup
- `docs/`: Project documentation

## API Documentation

API documentation is available at [docs/api-documentation.md](docs/api-documentation.md).

## User Manual

For detailed usage instructions, see the [User Manual](docs/user-manual.md).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
