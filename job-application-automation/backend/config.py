import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_default_secret_key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql+pymysql://username:password@localhost/db_name'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'your_jwt_secret_key'
    GMAIL_API_CREDENTIALS = os.environ.get('GMAIL_API_CREDENTIALS') or 'path/to/credentials.json'
    GMAIL_API_SCOPES = ['https://www.googleapis.com/auth/gmail.compose']