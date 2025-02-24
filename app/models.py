"""
SQLAlchemy Models Module

This module contains the SQLAlchemy models for the application, which define the database schema and
relationships between different entities.
"""

from . import db



class BaseModelMixin:
    """Base model for all database models."""

    def to_dict(self):
        """Convert model instance to dictionary."""
        return {
            column.name: getattr(self, column.name) for column in self.__table__.columns
        }

    def to_dict_with_relationships(self):
        """Convert model instance to dictionary with relationships."""
        data = self.to_dict()
        for relationship in self.__mapper__.relationships:
            related_data = getattr(self, relationship.key)
            if related_data is not None:
                if isinstance(related_data, list):
                    data[relationship.key] = [rel.to_dict() for rel in related_data]
                else:
                    data[relationship.key] = related_data.to_dict()
        return data

    def to_json(self):
        """Convert model instance to JSON."""
        return self.to_dict()

    def to_json_with_relationships(self):
        """Convert model instance to JSON with relationships."""
        return self.to_dict_with_relationships()

    def __repr__(self):
        """String representation of the model instance."""
        return f"<{self.__class__.__name__} {self.to_dict()}>"

    def __str__(self):
        """String representation of the model instance."""
        return self.__repr__()


class Skill(db.Model, BaseModelMixin):
    """Database model for a skill."""
    __tablename__ = "skills"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    icon = db.Column(db.Text, nullable=True)
    color = db.Column(db.Text, nullable=True)

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


class Keyword(db.Model, BaseModelMixin):
    """Database model for a keyword."""
    __tablename__ = "keywords"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)


class SkillKeyword(db.Model, BaseModelMixin):
    """Association table for the many-to-many relationship between skills and keywords."""
    __tablename__ = "skill_keyword"
    skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), primary_key=True)
    keyword_id = db.Column(db.Integer, db.ForeignKey("keywords.id"), primary_key=True)


class SkillRelationship(db.Model, BaseModelMixin):
    """Association table for the self-referential many-to-many relationship between skills."""
    __tablename__ = "skill_relationship"
    parent_skill_id = db.Column(
        db.Integer, db.ForeignKey("skills.id"), primary_key=True
    )
    child_skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), primary_key=True)
