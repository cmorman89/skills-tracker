"""
Skills View Module
"""

from flask import flash, redirect, render_template, request

from app import db
from helpers import get_categories, get_skills
from models import Skill

from . import skills_bp


@skills_bp.route("/")
def skills():
    """Display all skills."""
    skills = get_skills()
    categories = get_categories()
    print(skills)
    return render_template("skills.html", skills=skills, categories=categories)


@skills_bp.route("/add", methods=["GET", "POST"])
def add_skill():
    """Add a new skill."""
    if request.method == "POST":
        skill_name = request.form.get("skill-name").lower()
        category_id = request.form.get("category-id")
        if skill_name and get_skills(name=skill_name) is None:
            if category_id and get_categories(id=category_id):
                new_skill = Skill(name=skill_name, category_id=category_id)
                db.session.add(new_skill)
                db.session.commit()
                flash(f"Skill {skill_name} added successfully!", "success")
            else:
                flash("Invalid category!", "danger")
        else:
            flash("Skill name is required!", "danger")
    else:
        flash("Invalid request method!", "danger")
    return redirect("/skills")


@skills_bp.route("delete/<int:id>")
def delete_skill(id):
    """Delete a skill by ID."""
    skill = Skill.query.filter_by(id=id).first()
    if skill:
        db.session.delete(skill)
        db.session.commit()
        flash(f"Skill {skill.name} deleted successfully!", "success")
    else:
        flash("Skill not found!", "danger")
    return redirect("/skills")
