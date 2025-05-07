from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.resume import Resume
from ..models.user import User
from .. import db

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('/resume/upload', methods=['POST'])
@jwt_required()
def upload_resume():
    current_user_id = get_jwt_identity()
    data = request.json

    new_resume = Resume(content=data['content'], format=data['format'], user_id=current_user_id)
    db.session.add(new_resume)
    db.session.commit()

    return jsonify({'message': 'Resume uploaded successfully', 'resume_id': new_resume.id}), 201

@resume_bp.route('/resume/<int:resume_id>', methods=['GET'])
@jwt_required()
def get_resume(resume_id):
    current_user_id = get_jwt_identity()
    resume = Resume.query.filter_by(id=resume_id, user_id=current_user_id).first()

    if resume is None:
        return jsonify({'message': 'Resume not found'}), 404

    return jsonify({'content': resume.content, 'format': resume.format}), 200

@resume_bp.route('/resumes', methods=['GET'])
@jwt_required()
def get_user_resumes():
    current_user_id = get_jwt_identity()
    resumes = Resume.query.filter_by(user_id=current_user_id).all()

    return jsonify([{'id': resume.id, 'content': resume.content, 'format': resume.format} for resume in resumes]), 200