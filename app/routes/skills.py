from flask import Blueprint, request, jsonify, render_template
from ..models import db, Skill

skills_bp = Blueprint("skills", __name__)


@skills_bp.route("/", methods=["GET"])
def list_skills():
    """List all skills."""
    return jsonify([skill.to_dict() for skill in Skill.query.all()])


@skills_bp.route("/", methods=["POST"])
def create_skill():
    """Create a new skill."""
    data = request.json

    if data.get("name") == "":
        return jsonify({"error": "Skill name cannot be empty"}), 400
    if data.get("description") == "":
        description = None
    else:
        description = data.get("description")
    skill = Skill(name=data["name"], description=description)
    db.session.add(skill)
    db.session.commit()
    return jsonify(
        {"id": skill.id, "name": skill.name, "description": skill.description}
    ), 201
