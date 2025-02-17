"""
SQLAlchemy models for the application.
"""

import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Category(db.Model):
    __tablename__ = "categories"

    # Fields
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)

    def __repr__(self):
        return f"<Category {self.name}>"


class Skill(db.Model):
    __tablename__ = "skills"

    # Fields
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)

    # Relationships
    category = db.relationship("Category", backref="skills")
    user_skills = db.relationship(
        "UserSkill", back_populates="skill", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Skill {self.name}>"


class User(db.Model):
    __tablename__ = "users"

    # Fields
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    hash = db.Column(db.Text, nullable=False)

    # Relationships
    user_skills = db.relationship(
        "UserSkill", back_populates="user", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.username}>"


class UserSkill(db.Model):
    __tablename__ = "user_skills"

    # Fields
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), nullable=False)
    date_added = db.Column(db.Date, nullable=False, default=datetime.datetime.utcnow)
    source = db.Column(db.Text)
    application = db.Column(db.Text)
    mastery_level = db.Column(
        db.Integer, db.CheckConstraint("mastery_level >= 1 AND mastery_level <= 10")
    )
    category = db.Column(db.Text)

    # Relationships
    user = db.relationship("User", back_populates="user_skills")
    skill = db.relationship("Skill", back_populates="user_skills")

    def __repr__(self):
        return f"<UserSkill User={self.user_id} Skill={self.skill_id} Mastery={self.mastery_level}>"
