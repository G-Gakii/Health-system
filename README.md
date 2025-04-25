# Health App

This repository hosts both the **backend** (Django REST Framework) and the **frontend** (React) for the Health App. The application allows users to manage health programs, clients, and enrollments efficiently.

## Features

### Backend

- Built with Django and Django REST Framework.
- RESTful API for managing health programs, clients, and enrollments.
- Secure data handling and optimized database queries.

### Frontend

- Developed using React for a responsive user interface.
- Seamless integration with backend APIs via Axios.
- Features include data display, search, and client-side routing with React Router.

## Setup Instructions

### Prerequisites

- Python (v3.10 or above)
- Node.js (v16 or above) and npm
- A virtual environment for Python dependencies (recommended)

### Installation

1. Clone the repository: `git clone git@github.com:G-Gakii/Health-system.git`
2. cd Health-system

### Backend Setup

1. Navigate to the backend directory:`cd backend`
2. Install Python dependencies:`pip install -r requirements.txt`
3. Set up environment variables:

   - Create a .env file in the backend directory to specify sensitive settings.
   - Example .env file:

   ```
   SECRET_KEY=`your-secret-key`

   ```

4. Run migrations: : `python manage.py makemigrations` `python manage.py migrate`
5. Start the backend server:`python manage.py runserver`

### Frontend Setup

1. Navigate to the frontend directory:`cd frontend`
2. Install Node.js dependencies: `npm install`
3. Set up environment variables:

- Create a .env file in the frontend directory to specify the backend URL.
- Example .env file: `REACT_APP_BACKEND_URL=""`

4. npm start

### API Endpoints

#### Health Programs

- `GET /program/` List all programs
- `POST /program/ `Create a new program
- `GET /program/<uuid:pk>` Retrieve a program by ID
- `PUT /program/<uuid:pk>` Update a program
- `DELETE /program/<uuid:pk>` Delete a program

#### Clients

- `GET /client/` List all clients
- `POST /client/ `Create a new client
- `GET /client/<str:pk>` Retrieve client by ID
- `PUT /client/<str:pk> `Update client
- `DELETE /client/<str:pk>` Delete client
- Supports search by fullName or client_id.

#### Enrollments

- `GET /enroll/` List all enrollments
- `POST /enroll/` Create a new enrollment
- `GET /enroll/<uuid:pk>` Retrieve enrollment by ID
- `PUT /enroll/<uuid:pk>` Update enrollment
- `DELETE /enroll/<uuid:pk>` Delete enrollment

### Technologies Used

#### Backend

- Django: Python web framework
- Django REST Framework: API development framework
- Python Dotenv: Manage environment variables

#### Frontend

- React: JavaScript library for building user interfaces
- Axios: HTTP client for making API requests
- React Router: Client-side routing

### Running the Full Application

1. Start the backend server:
   ```
   cd backend
   python manage.py runserver
   ```
2. Start the frontend server:
   ```
   cd frontend
   npm start
   ```
3. Open your browser and access the frontend at:

`http://localhost:3000`
