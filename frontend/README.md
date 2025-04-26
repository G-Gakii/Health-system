# Health Program Management System

This is the frontend of the Health Program Management System, built using ReactIt interacts with the backend API to manage health programs, clients, and enrollments, and allows authenticated users (doctors) to perform actions like creating health programs, enrolling clients, and viewing client profiles.

## Features

1. User Authentication: Login and access the health program management system using JWT tokens.
2. Create Health Programs: Allow admins to create, update, and manage health programs.
3. Manage Clients: Register new clients, view their profiles, and search for them by name or ID.
4. Enroll Clients: Enroll clients into various health programs.
5. Client Profile: View detailed information about a client, including their enrollments.

## Tech Stack

- Frontend: React.js
- State Management: React Context API
- Authentication: JWT (JSON Web Tokens)
- Boostrap
- Backend API: Django REST Framework ()

## Prerequisites

- Node.js and npm (Node Package Manager) installed on your local machine.
- Access to the backend API (ensure it's running locally ).

## Installation

1. git clone `https://github.com/G-Gakii/Health-system.git`
2. Navigate to the project directory: `cd Health-system`
3. Navigate to backend : `cd frontend`

bash
Copy
Edit
npm install
Set up the API URL for the backend:

Create a .env file in the root of the frontend project.

Add the following entry to point to your backend:

bash
Copy
Edit
REACT_APP_API_URL=http://127.0.0.1:8000/api
Start the development server:

bash
Copy
Edit
npm start
The frontend will be available at:

arduino
Copy
Edit
http://localhost:3000
Frontend Structure
Directory Structure
src/

components/ - Reusable React components (buttons, form inputs, etc.)

pages/ - Contains different pages (e.g., Home, Login, Health Programs, Client Profile, etc.)

services/ - Contains functions for interacting with the API (e.g., login, register, CRUD operations for clients and health programs).

redux/ - (If using Redux) Contains state management and actions for authentication and health programs.

utils/ - Helper functions and utilities (e.g., JWT token handling, API request setup).

Authentication
Login
Login Page allows users to log in by sending their credentials (username and password) to the backend API.

JWT Token is stored in the localStorage or cookies to manage authentication.

Example Login Request:

Endpoint: /api/user/login/

Method: POST

Request Body:

json
Copy
Edit
{
"username": "admin",
"password": "password123"
}
After successful login, store the JWT token and use it in the Authorization header for subsequent requests.
