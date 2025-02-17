"""
Helper Functions Module
"""

from models import Category, Skill


def get_skills(id=None, name=None):
    """Get all skills or a specific skill by ID or name."""
    if id:
        return Skill.query.filter_by(id=id).first()
    elif name:
        return Skill.query.filter_by(name=name).first()
    return Skill.query.all()


def get_categories(id=None, name=None):
    """Get all categories or a specific category by ID or name."""
    if id:
        return Category.query.filter_by(id=id).first()
    elif name:
        return Category.query.filter_by(name=name).first()
    return Category.query.all()
