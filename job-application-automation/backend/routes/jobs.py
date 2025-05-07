from flask import Blueprint, jsonify, request
from ..models.job_listing import JobListing
from ..services.job_scraper import scrape_job_listings

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/jobs/scrape', methods=['GET'])
def get_job_listings():
    job_listings = scrape_job_listings()
    return jsonify(job_listings), 200

@jobs_bp.route('/jobs', methods=['GET'])
def list_jobs():
    jobs = JobListing.query.all()
    return jsonify([job.to_dict() for job in jobs]), 200

@jobs_bp.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = JobListing.query.get_or_404(job_id)
    return jsonify(job.to_dict()), 200