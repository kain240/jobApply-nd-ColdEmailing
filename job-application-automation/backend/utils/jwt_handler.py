from datetime import datetime, timedelta
import jwt
from flask import current_app

def generate_token(user_id):
    expiration = datetime.utcnow() + timedelta(days=1)  # Token valid for 1 day
    token = jwt.encode({'user_id': user_id, 'exp': expiration}, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token

def decode_token(token):
    try:
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None