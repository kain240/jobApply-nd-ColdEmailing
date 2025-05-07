# Job Application Automation

## Project Overview
The Job Application Automation project is designed to streamline and automate the job application process. It assists users in building tailored resumes, finding job and internship listings, sending cold emails to HRs, and managing follow-ups and communication.

## Features
- **Resume Generation**: Create resumes using multiple templates.
- **Resume Management**: Save and manage multiple resumes.
- **Job Listings**: Display job listings stored in a MySQL database.
- **Email Automation**: Draft and send cold emails to HR contacts.
- **Follow-Up Management**: Automate follow-up emails.
- **Professional Templates**: Access email templates based on job type and company type.

## Tech Stack
- **Frontend**: React.js with Vite as the build tool and Tailwind CSS for styling.
- **Backend**: Flask framework with MySQL as the database.
- **Authentication**: JWT (JSON Web Tokens) for user authentication.
- **Email Integration**: Gmail API for managing email drafts.

## Project Structure
```
job-application-automation
├── backend
│   ├── app.py
│   ├── config.py
│   ├── models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── resume.py
│   │   ├── job_listing.py
│   │   ├── email_draft.py
│   │   └── application_history.py
│   ├── routes
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── resume.py
│   │   ├── jobs.py
│   │   ├── email.py
│   │   └── application.py
│   ├── services
│   │   ├── gmail_service.py
│   │   └── job_scraper.py
│   ├── utils
│   │   ├── jwt_handler.py
│   │   └── validators.py
│   ├── requirements.txt
│   └── README.md
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── ResumeUploader.jsx
│   │   │   ├── JobListings.jsx
│   │   │   ├── EmailDraft.jsx
│   │   │   ├── FollowUpManager.jsx
│   │   │   └── AuthForm.jsx
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ResumeBuilder.jsx
│   │   ├── services
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── README.md
└── .gitignore
```

## Installation
1. Clone the repository.
2. Navigate to the `backend` directory and install the required packages using:
   ```
   pip install -r requirements.txt
   ```
3. Set up the MySQL database and configure the connection in `config.py`.
4. Run the Flask application:
   ```
   python app.py
   ```
5. Navigate to the `frontend` directory and install the frontend dependencies using:
   ```
   npm install
   ```
6. Start the frontend application:
   ```
   npm run dev
   ```

## Usage
- Users can register and log in to the application.
- After logging in, users can upload resumes, view job listings, draft cold emails, and manage application history.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.