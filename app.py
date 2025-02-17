import os

from datetime import datetime

from flask import Flask, flash, render_template, redirect, request
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy

# Create Flask app
app = Flask(__name__)
# Congifure Flask for SQLAlchemy
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "skills.db")}'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SQLALCHEMY_ECHO'] = True
# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

# Initialize Session
Session(app)
# Initialize SQLAlchemy
db = SQLAlchemy(app)

class Skill(db.Model):
    __tablename__ = 'skills'

    # Fields
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)

    # Relationships
    user_skills = db.relationship('UserSkill', back_populates='skill', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Skill {self.name}>'


class User(db.Model):
    __tablename__ = 'users'

    # Fields
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    hash = db.Column(db.Text, nullable=False) 

    # Relationships
    user_skills = db.relationship('UserSkill', back_populates='user', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.username}>'


class UserSkill(db.Model):
    __tablename__ = 'user_skills'

    # Fields
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'), nullable=False)
    date_added = db.Column(db.Date, nullable=False, default=datetime.now())
    source = db.Column(db.Text)
    application = db.Column(db.Text)
    mastery_level = db.Column(db.Integer, db.CheckConstraint('mastery_level >= 1 AND mastery_level <= 10'))
    category = db.Column(db.Text)

    # Relationships
    user = db.relationship('User', back_populates='user_skills')
    skill = db.relationship('Skill', back_populates='user_skills')

    def __repr__(self):
        return f'<UserSkill User={self.user_id} Skill={self.skill_id} Mastery={self.mastery_level}>'

@app.route('/')
def index():
    skills = get_skills()
    print(skills)
    return render_template("skills.html", skills=skills)


@app.route('/skills')
def skills():
    skills = get_skills()
    print(skills)
    return render_template("skills.html", skills=skills)


def get_skills(id=None, name=None):
    """Get all skills or a specific skill by ID."""
    if id:
        return Skill.query.filter_by(id=id).first()
    elif name:
        return Skill.query.filter_by(name=name).first()
    return Skill.query.all()

@app.route('/skills/add', methods=['GET', 'POST'])
def add_skill():
    """Add a new skill."""
    if request.method == 'POST':
        skill_name = request.form.get('skill_name').lower()
        if skill_name and get_skills(name=skill_name) is None:
            new_skill = Skill(name=skill_name)
            db.session.add(new_skill)
            db.session.commit()
            flash(f'Skill {skill_name} added successfully!', 'success')
        else:
            flash('Skill name is required!', 'danger')
    return redirect('/skills')

@app.route('/skills/<int:id>/delete')
def delete_skill(id):
    """Delete a skill by ID."""
    skill = Skill.query.filter_by(id=id).first()
    if skill:
        db.session.delete(skill)
        db.session.commit()
        flash(f'Skill {skill.name} deleted successfully!', 'success')
    else:
        flash('Skill not found!', 'danger')
    return redirect('/skills')

