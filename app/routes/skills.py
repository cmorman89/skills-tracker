from flask import Blueprint, request, jsonify
from ..models import db, Skill

skills_bp = Blueprint("skills", __name__)


@skills_bp.route("/", methods=["GET"])
def list_all_skills():
    """List all skills."""
    return jsonify([skill.to_json() for skill in get_skill()])


@skills_bp.route("/<int:skill_id>", methods=["GET"])
def list_skill_by_id(skill_id):
    """Get a skill by ID."""
    skill = get_skill(skill_id=skill_id)
    return jsonify(skill.to_json())


@skills_bp.route("/", methods=["POST"])
def create_skill():
    """Create a new skill."""

    # Get the data from the request
    data = request.json

    # Check if data is provided
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Check skill name is provided
    if not data.get("name").strip():
        return jsonify({"error": "Skill name cannot be empty"}), 400
    name = data.get("name").lower().strip()

    # Check for duplicate skill name
    if get_skill(skill_name=name):
        return jsonify({"error": "Skill name already exists"}), 400

    # Check if description is provided
    if data.get("description") == "" or data.get("description") is None:
        description = None
    else:
        description = data.get("description").strip()

    # Add the new skill to the database
    skill = Skill(name=name, description=description)
    db.session.add(skill)
    db.session.commit()

    # Return the created skill
    return jsonify(skill.to_json()), 201


@skills_bp.route("/<int:skill_id>", methods=["PUT"])
def update_skill(skill_id):
    pass


@skills_bp.route("/<int:skill_id>", methods=["DELETE"])
def delete_skill(skill_id):
    """Delete a skill by ID"""
    skill = get_skill(skill_id=skill_id)

    if skill:
        db.session.delete(skill)
        db.session.commit()
        return jsonify({"message": "Skill deleted successfully"}), 200

@skills_bp.route("/<int:skill_id>/children", methods=["GET"])
def list_children_skills(skill_id):
    """List all children skills of a skill by ID"""

    # Check if skill exists
    if skill := get_skill(skill_id=skill_id):
        # Get all children skills
        children = (
            [child.to_json() for child in skill.children] if skill.children else []
        )
        return jsonify(children), 200
    # If skill does not exist, return an error
    return jsonify({"error": "Skill not found"}), 404


@skills_bp.route("/<int:skill_id>/parents", methods=["GET"])
def list_parent_skills(skill_id):
    """List all parent skills of a skill by ID"""

    # Check if skill exists
    if skill := get_skill(skill_id=skill_id):
        # Get all parent skills
        parents = (
            [parent.to_json() for parent in skill.parents] if skill.parents else []
        )
        return jsonify(parents), 200
    # If skill does not exist, return an error
    return jsonify({"error": "Skill not found"}), 404


@skills_bp.route("/<int:skill_id>/parents", methods=["POST"])
def add_parent_skill(skill_id):
    """Add a parent skill to a skill by ID"""

    # Validate if child skill exists
    if not (child := get_skill(skill_id=skill_id)):
        return jsonify({"error": "Child skill not found"}), 404

    # Validate the parent skill ID
    parent_id = request.json.get("parent_id")
    try:
        parent_id = int(parent_id)
        if parent_id <= 0:
            raise ValueError
    except ValueError:
        return jsonify({"error": "Invalid parent ID"}), 400

    # Check if the parent skill exists
    if not (parent := get_skill(skill_id=parent_id)):
        return jsonify({"error": "Parent skill not found"}), 404

    # Check if the parent skill is already a parent of the child skill
    if parent in child.parents:
        return jsonify({"error": "Parent skill already exists in list"}), 400

    # Add the parent skill to the child skill
    child.parents.append(parent)
    db.session.commit()
    return jsonify({"message": "Parent skill added to list successfully"}), 200



def get_skill(skill_id=None, skill_name=None):
    """Get all skills or a specific skill by ID or name."""

    # Return an error if both skill_id and skill_name are provided
    if skill_id and skill_name:
        return jsonify(
            {"error": "Please provide either a skill ID or a skill name, not both"}
        ), 400
    # Get skill by ID if provided
    elif skill_id:
        return Skill.query.get(skill_id)
    # Get skill by name if provided
    elif skill_name:
        return Skill.query.filter_by(name=skill_name).first()
    # Get all skills if no ID or name is provided
    return Skill.query.all()
