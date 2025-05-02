# Movie Rental System

A Django-based Movie Catalog where users can browse, search, filter, rent, and manage movies.

## Features

- Movie listing with search and filter options
- Login/Logout and user authentication
- Rent and return movies (with availability status)
- View detailed movie information

## Tech Stack

- **Backend**: Django (Python)
- **Frontend**: React
- **Data**: movies.json file

## How to Run

### Option 1: Using Docker (Recommended)

1. Clone this repository.

2. Make sure you have Docker and Docker Compose installed.

3. Run the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. Visit [http://localhost:3000](http://localhost:3000) in your browser to access the frontend.

5. The backend API is available at [http://localhost:8000](http://localhost:8000).

6. To stop the application, press `Ctrl+C` in the terminal where Docker Compose is running, or run:

   ```bash
   docker-compose down
   ```

### Option 2: Manual Setup

#### Backend Setup

1. Clone this repository.

2. Create and activate a virtual environment:
   Stay in the root directory

   ```bash
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Run the development server:

   ```bash
   python manage.py runserver
   ```

5. The backend will be available at [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

#### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The frontend will be available at [http://localhost:3000](http://localhost:3000)

## Development

- Backend code is in the `backend` directory
- Frontend code is in the `frontend` directory
- Docker configuration is in the `Dockerfile` files and `docker-compose.yml`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request
