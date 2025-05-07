# Job Application Automation - Frontend

This project is a React-based frontend for the Job Application Automation application. It aims to streamline and automate the job application process for users by providing various features related to resume building, job listings, and email management.

## Features

- **Resume Generation**: Users can create and manage multiple resumes tailored to specific job roles using various templates.
- **Job Listings**: Displays job and internship listings fetched from a MySQL database.
- **Email Management**: Users can draft and send cold emails to HRs, as well as automate follow-up emails.
- **User Authentication**: Secure login and registration functionality using JWT (JSON Web Tokens).

## Technologies Used

- **Frontend Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS

## Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/         # Reusable components
│   ├── pages/              # Application pages
│   ├── services/           # API and authentication services
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point for the React application
│   └── index.css           # Global styles
├── package.json            # NPM configuration
└── vite.config.js          # Vite configuration
```

## Setup Instructions

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd job-application-automation/frontend
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Run the Development Server**:
   ```
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:3000` to view the application.

## API Endpoints

The frontend interacts with the backend through the following API endpoints:

- `POST /resume/upload`: Upload a resume.
- `GET /jobs/scrape`: Retrieve job listings.
- `POST /email/send`: Send cold emails and follow-ups.
- `GET /resume/templates`: Fetch available resume templates.
- `POST /auth/login`: User login.
- `POST /auth/register`: User registration.

## Contribution

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.