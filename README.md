Smart Logistics Management System

A web-based Smart Logistics Management System designed to help users identify road risks, report road issues, find safer routes, and send emergency SOS alerts.

Features

- User registration and login
- Secure password hashing
- User dashboard
- Road condition and risk management
- Road issue reporting
- Route finding and risk prediction
- Estimated distance and travel time
- Emergency SOS alerts
- Admin dashboard
- PostgreSQL database
- Responsive web interface

Tech Stack

Frontend

- HTML
- CSS
- EJS

Backend

- Node.js
- Express.js

Database

- PostgreSQL

Other

- Axios
- Express Session
- bcryptjs
- dotenv

Project Structure

smart-logistics/
│
├── app.js
├── package.json
├── .env
├── .gitignore
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── images/
│
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── dashboard.ejs
│   ├── routes.ejs
│   ├── reports.ejs
│   ├── report.ejs
│   ├── sos.ejs
│   └── admin.ejs
│
├── routes/
│   ├── auth.js
│   ├── roads.js
│   ├── reports.js
│   ├── routes.js
│   └── sos.js
│
├── controllers/
│   ├── authController.js
│   ├── roadController.js
│   ├── reportController.js
│   ├── routeController.js
│   └── sosController.js
│
├── db/
│   ├── pool.js
│   └── schema.sql
│
└── ai/
    └── prediction.js

Installation

1. Clone the repository

git clone YOUR_REPOSITORY_URL
cd smart-logistics

2. Install dependencies

npm install

3. Configure PostgreSQL

Create a PostgreSQL database named:

smart_logistics

Then execute the SQL commands in:

db/schema.sql

This creates the required tables:

- users
- roads
- reports
- routes
- sos_alerts

4. Configure environment variables

Create a ".env" file in the project root:

PORT=3000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=smart_logistics
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_PORT=5432

SESSION_SECRET=your-secret-key

Do not commit ".env" to GitHub.

5. Start the application

npm start

For development with automatic restart:

npm run dev

Open:

http://localhost:3000

Git Workflow

Team members should work on separate feature branches.

git checkout -b feature/your-feature

After making changes:

git add .
git commit -m "Add your feature"
git push -u origin feature/your-feature

Create a Pull Request on GitHub and merge the changes into "main" after review.

Branch Examples

main
feature/auth
feature/routes
feature/reports
feature/sos
feature/frontend

Environment Variables

Variable| Description
"PORT"| Application port
"DB_USER"| PostgreSQL username
"DB_HOST"| PostgreSQL host
"DB_NAME"| Database name
"DB_PASSWORD"| PostgreSQL password
"DB_PORT"| PostgreSQL port
"SESSION_SECRET"| Express session secret

Current Status

The project currently contains the core application structure, authentication, database integration, road reporting, route management, and SOS functionality.

The route prediction module currently uses temporary prediction logic and can later be replaced with a real routing API or machine-learning model.

Future Improvements

- Real-time traffic data
- GPS and live location tracking
- Real map integration
- AI-based road risk prediction
- Weather-based route risk analysis
- Real-time SOS notifications
- Advanced admin analytics
- Route optimization
- Mobile application

Security

- Passwords are hashed using bcrypt.
- Database credentials are stored in environment variables.
- ".env" is excluded from Git.
- Parameterized PostgreSQL queries are used to reduce SQL injection risk.
- Admin-only operations require an authenticated admin session.

License

This project is developed for educational and hackathon purposes.
