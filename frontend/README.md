# HealthConnect

HealthConnect built using ReactIt interacts with the backend API to manage health programs, clients, and enrollments, and allows authenticated users (doctors) to perform actions like creating health programs, enrolling clients, and viewing client profiles.

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
- Bootstrap
- Backend API: Django REST Framework

## Prerequisites

- Node.js and npm (Node Package Manager) installed on your local machine.
- Access to the backend API (ensure it's running locally ).Backend step by step set up : https://github.com/G-Gakii/Health-system/blob/main/backend/README.md

## Installation

1. git clone `https://github.com/G-Gakii/Health-system.git`
2. Navigate to the project directory: `cd Health-system`
3. Navigate to frontend : `cd frontend`
4. npm install
5. Set up the API URL for the backend

- Create a .env file in the root of the frontend project.Add the following entry to point to your backend:
  `REACT_APP_API_URL="Backend API URL"`

6. Start the development server:`npm run dev`
   The frontend will be available at:`http://localhost:3000`
