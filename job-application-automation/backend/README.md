# Job Application Automation Backend

## Overview
This backend service is part of the Job Application Automation project, which aims to streamline and automate the job application process. The backend is built using Flask and connects to a MySQL database to manage user data, resumes, job listings, email drafts, and application history.

## Features
- User authentication using JWT (JSON Web Tokens).
- Resume management: upload, retrieve, and manage multiple resumes.
- Job listing management: scrape and store job listings.
- Email management: draft and send cold emails, automate follow-ups.
- Integration with Gmail API for managing email drafts.

## Project Structure
```
backend/
├── app.py                # Main entry point for the Flask application
├── config.py             # Configuration settings for the application
├── models/               # Contains data models
│   ├── __init__.py       # Initializes the models package
│   ├── user.py           # User model
│   ├── resume.py         # Resume model
│   ├── job_listing.py     # JobListing model
│   ├── email_draft.py    # EmailDraft model
│   └── application_history.py # ApplicationHistory model
├── routes/               # Contains route definitions
│   ├── __init__.py       # Initializes the routes package
│   ├── auth.py           # Authentication routes
│   ├── resume.py         # Resume-related routes
│   ├── jobs.py           # Job listing routes
│   ├── email.py          # Email-related routes
│   └── application.py     # Application history routes
├── services/             # Contains service functions
│   ├── gmail_service.py   # Functions for Gmail API integration
│   └── job_scraper.py     # Functions for scraping job listings
├── utils/                # Utility functions
│   ├── jwt_handler.py     # JWT token handling
│   └── validators.py      # Input validation functions
├── requirements.txt      # Python dependencies
└── README.md             # Documentation for the backend
```

## Setup Instructions
1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd job-application-automation/backend
   ```

2. **Install dependencies**:
   ```
   pip install -r requirements.txt
   ```

3. **Configure the application**:
   Update `config.py` with your database connection details and any other necessary configurations.

4. **Run the application**:
   ```
   python app.py
   ```

5. **API Endpoints**:
   The backend exposes several RESTful API endpoints for frontend interaction. Refer to the route files for detailed endpoint information.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.