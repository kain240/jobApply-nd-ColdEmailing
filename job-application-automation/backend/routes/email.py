from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.email_draft import EmailDraft
from ..services.gmail_service import create_email_draft

email_bp = Blueprint('email', __name__)

@email_bp.route('/email/send', methods=['POST'])
@jwt_required()
def send_email():
    current_user = get_jwt_identity()
    data = request.get_json()

    recipient = data.get('recipient')
    subject = data.get('subject')
    body = data.get('body')

    if not recipient or not subject or not body:
        return jsonify({"msg": "Missing required fields"}), 400

    # Create email draft using Gmail API
    draft_id = create_email_draft(recipient, subject, body, current_user)

    if draft_id:
        return jsonify({"msg": "Email draft created successfully", "draft_id": draft_id}), 201
    else:
        return jsonify({"msg": "Failed to create email draft"}), 500

@email_bp.route('/email/drafts', methods=['GET'])
@jwt_required()
def get_email_drafts():
    current_user = get_jwt_identity()
    drafts = EmailDraft.query.filter_by(user_id=current_user).all()
    return jsonify([draft.to_dict() for draft in drafts]), 200

@email_bp.route('/email/follow-up', methods=['POST'])
@jwt_required()
def send_follow_up():
    current_user = get_jwt_identity()
    data = request.get_json()

    recipient = data.get('recipient')
    subject = data.get('subject')
    body = data.get('body')

    if not recipient or not subject or not body:
        return jsonify({"msg": "Missing required fields"}), 400

    # Create follow-up email draft using Gmail API
    draft_id = create_email_draft(recipient, subject, body, current_user)

    if draft_id:
        return jsonify({"msg": "Follow-up email draft created successfully", "draft_id": draft_id}), 201
    else:
        return jsonify({"msg": "Failed to create follow-up email draft"}), 500