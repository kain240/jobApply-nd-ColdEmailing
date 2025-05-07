from google.oauth2 import service_account
from googleapiclient.discovery import build
import os

class GmailService:
    def __init__(self, credentials_file):
        self.credentials_file = credentials_file
        self.service = self.authenticate()

    def authenticate(self):
        credentials = service_account.Credentials.from_service_account_file(
            self.credentials_file,
            scopes=['https://www.googleapis.com/auth/gmail.compose']
        )
        return build('gmail', 'v1', credentials=credentials)

    def create_draft(self, user_id, message_body, subject, to):
        message = {
            'message': {
                'raw': self._create_message(to, subject, message_body)
            }
        }
        draft = self.service.users().drafts().create(userId=user_id, body=message).execute()
        return draft

    def _create_message(self, to, subject, message_body):
        from base64 import urlsafe_b64encode
        from email.mime.text import MIMEText

        message = MIMEText(message_body)
        message['to'] = to
        message['subject'] = subject
        raw_message = urlsafe_b64encode(message.as_bytes()).decode()
        return raw_message

    def list_drafts(self, user_id):
        drafts = self.service.users().drafts().list(userId=user_id).execute()
        return drafts.get('drafts', [])

    def delete_draft(self, user_id, draft_id):
        self.service.users().drafts().delete(userId=user_id, id=draft_id).execute()