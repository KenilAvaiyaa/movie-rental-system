# Movie Rental System

A Django-based Movie Catalog where users can browse, search, filter, rent, and manage movies.

## Features

- Movie listing with search and filter options
- Login/Logout and user authentication
- Rent and return movies (with availability status)
- View detailed movie information

## Tech Stack

- **Backend**: Django
- **Frontend**: HTML, CSS (Tailwind/Bootstrap optional), JavaScript
- **Data**: movies.json file

## How to Run

1. Clone this repository.

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:

   ```bash
   python manage.py runserver
   ```

5. Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser.
