# from flask_sqlalchemy import SQLAlchemy
from app import db  # Import your Flask app instance
from app import UserProfile,  WeeklyMealPlan, Feedback  # Import your SQLAlchemy models
from app import app


def create_tables():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    create_tables()