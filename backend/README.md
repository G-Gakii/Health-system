# HealthConnect

This is a RESTful API built with Django and Django REST Framework (DRF) to manage health programs, clients, and their enrollments. The system also includes secure user registration and authentication using JWT via djangorestframework-simplejwt

## Features

- JWT-based user authentication (register, login, refresh)
- Manage Health Programs
- Manage Clients
- Enroll Clients into Health Programs
- Search functionality for clients and enrollments
- Permissions to restrict actions to authenticated users

## Tech Stack

- Django
- Django REST Framework
- JWT (SimpleJWT)
- Postgres

## Prerequisites

- Python (v3.10 or above)

## Installation

1. git clone `https://github.com/G-Gakii/Health-system.git`
2. Navigate to the project directory: `cd Health-system`
3. Navigate to backend : `cd backend`
4. Create and activate a virtual environment:
   - `python -m venv venv`
   - `source venv/bin/activate  # On Windows: venv\Scripts\activate`
5. Install the dependencies: `pip install -r requirements.txt`
6. Create a database
7. Set Up Environment Variables Create a .env file in the backend folder and add the following environment variables:

   - SECRET_KEY=""
   - DB_NAME=""
   - DB_USER=""
   - DB_PASSWORD=""

8. Apply migrations:`python manage.py migrate`
9. Run the server:`python manage.py runserver`
10. API will be available at:`http://127.0.0.1:8000/api/`

## API Endpoints

### Authentication

- `POST   /api/user/register/` : Register a new user
- `POST   /api/user/login/  ` : Login and obtain JWT access & refresh tokens
- `POST   /api/user/refresh/  ` : Refresh JWT access token

### Health Programs

- `GET    /api/health/program/  ` : List all health programs
- `POST   /api/health/program/  ` : Create a new health program (Authenticated users only)
- `GET    /api/health/program/<uuid:pk>` : Retrieve a specific health program
- `PUT /api/health/program/<uuid:pk>` : Update a specific health program (Authenticated users only)
- `PATCH /api/health/program/<uuid:pk>` : Partially update a specific health program
- `DELETE/api/health/program/<uuid:pk>` : Delete a specific health program (Authenticated users only)

- Search clients by full name or client ID.

#### Clients

- `GET    /api/health/client/` : List all clients (searchable by fullName and client_id)
- `POST   /api/health/client/` : Create a new client (Authenticated users only)
- `GET    /api/health/client/<str:pk>` : Retrieve a specific client
- `PUT    /api/health/client/<str:pk>` : Update a specific client (Authenticated users only)
- `PATCH  /api/health/client/<str:pk>  ` : Partially update a specific client
- `DELETE /api/health/client/<str:pk> ` : Delete a specific client (Authenticated users only)

#### Enrollments

- `GET    /api/health/enroll/ ` : List all enrollments (searchable by program name)
- `POST   /api/health/enroll/  ` : Enroll a client into a health program (Authenticated users only)
- `GET    /api/health/enroll/<uuid:pk> ` : Retrieve a specific enrollment
- `PUT    /api/health/enroll/<uuid:pk> ` : Update a specific enrollment (Authenticated users only)
- `PATCH  /api/health/enroll/<uuid:pk> ` : Partially update a specific enrollment
- `DELETE /api/health/enroll/<uuid:pk>` : Delete a specific enrollment (Authenticated users only)

- Validate that a client is not enrolled twice into the same program.

# Notes

- JWT Authentication: Pass the Authorization: Bearer <access_token> header for authenticated endpoints.
- Permissions:
  1. Read access is open (for program and client listing).
  2. Write access (create/update/delete) requires authentication.
- Filtering:
  1. Clients: by fullName or client_id
  2. Enrollments: by program_name
