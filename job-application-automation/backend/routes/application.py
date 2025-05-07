from flask import Blueprint, request, jsonify
from models.application_history import ApplicationHistory
from models.hr_contact import HRContact
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db

application_bp = Blueprint('application', __name__)

@application_bp.route('/applications', methods=['GET'])
@jwt_required()
def get_application_history():
    user_id = get_jwt_identity()
    applications = ApplicationHistory.query.filter_by(user_id=user_id).all()
    return jsonify([application.to_dict() for application in applications]), 200

@application_bp.route('/applications', methods=['POST'])
@jwt_required()
def add_application():
    user_id = get_jwt_identity()
    data = request.json
    new_application = ApplicationHistory(
        user_id=user_id,
        job_listing_id=data['job_listing_id'],
        hr_contact_id=data['hr_contact_id'],
        status=data['status'],
        follow_up_date=data['follow_up_date']
    )
    db.session.add(new_application)
    db.session.commit()
    return jsonify(new_application.to_dict()), 201

@application_bp.route('/applications/<int:application_id>', methods=['PUT'])
@jwt_required()
def update_application(application_id):
    data = request.json
    application = ApplicationHistory.query.get_or_404(application_id)
    application.status = data.get('status', application.status)
    application.follow_up_date = data.get('follow_up_date', application.follow_up_date)
    db.session.commit()
    return jsonify(application.to_dict()), 200

@application_bp.route('/applications/<int:application_id>', methods=['DELETE'])
@jwt_required()
def delete_application(application_id):
    application = ApplicationHistory.query.get_or_404(application_id)
    db.session.delete(application)
    db.session.commit()
    return jsonify({'message': 'Application deleted successfully'}), 204