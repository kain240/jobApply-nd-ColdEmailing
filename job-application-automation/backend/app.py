from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from routes import auth, resume, jobs, email, application

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db = SQLAlchemy(app)

# Registering Blueprints
app.register_blueprint(auth.bp)
app.register_blueprint(resume.bp)
app.register_blueprint(jobs.bp)
app.register_blueprint(email.bp)
app.register_blueprint(application.bp)

if __name__ == '__main__':
    app.run(debug=True)