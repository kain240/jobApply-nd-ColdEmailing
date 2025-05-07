def validate_email(email):
    import re
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_regex, email) is not None

def validate_password(password):
    if len(password) < 8:
        return False
    if not any(char.isdigit() for char in password):
        return False
    if not any(char.isalpha() for char in password):
        return False
    return True

def validate_resume_content(content):
    if not content or len(content) < 50:
        return False
    return True

def validate_job_listing(data):
    required_fields = ['title', 'company', 'location', 'description']
    return all(field in data for field in required_fields)

def validate_email_draft(subject, body):
    if not subject or not body:
        return False
    return True

def validate_user_registration(data):
    required_fields = ['username', 'email', 'password']
    return all(field in data for field in required_fields) and validate_email(data['email']) and validate_password(data['password'])