"""
SQLAlchemy models for the application.
"""

from . import db

class Skill(db.Model):
    __tablename__ = "skills"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)

    # Many-to-many relationship with keywords
    keywords = db.relationship(
        "Keyword",
        secondary="skill_keyword",
        backref=db.backref("skills", lazy="dynamic"),
    )
    # Self-referential many-to-many relationship for parent-child skills
    parents = db.relationship(
        "Skill",
        secondary="skill_relationship",
        primaryjoin="Skill.id == SkillRelationship.child_skill_id",
        secondaryjoin="Skill.id == SkillRelationship.parent_skill_id",
        backref="children",
    )

    def __repr__(self):
        return f"<Skill {self.name}>"

class Keyword(db.Model):
    __tablename__ = "keywords"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    
    def __repr__(self):
        return f"<Keyword {self.name}>"

class SkillKeyword(db.Model):
    __tablename__ = "skill_keyword"
    skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), primary_key=True)
    keyword_id = db.Column(db.Integer, db.ForeignKey("keywords.id"), primary_key=True)


class SkillRelationship(db.Model):
    __tablename__ = "skill_relationship"
    parent_skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), primary_key=True)
    child_skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), primary_key=True)