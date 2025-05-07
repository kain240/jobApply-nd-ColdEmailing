from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class JobListing(db.Model):
    __tablename__ = 'job_listings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    date_posted = db.Column(db.DateTime, nullable=False)
    url = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<JobListing {self.title} at {self.company}>'