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
    return jsonify(skill.to_json_with_relationships())


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
    """Update a skill by ID"""

    # Get the current skill
    skill = get_skill(skill_id=skill_id)
    if not skill:
        return jsonify({"error": "Skill not found"}), 404

    # Get the data from the request
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Check skill name
    name = data.get("name")
    if name and isinstance(name, str):
        name = name.strip().lower()

    # Check for duplicate skill name
    if name is not skill.name:
        if get_skill(skill_name=name):
            return jsonify({"error": "Skill name already exists"}), 400
        skill.name = name

    # Check if description is provided
    description = data.get("description")

    # Check if description is empty
    if description == "" or data.get("description") is None:
        skill.description = None
    else:
        skill.description = description.strip()

    # Update the skill in the database
    db.session.commit()
    return jsonify(skill.to_json()), 200


@skills_bp.route("/<int:skill_id>", methods=["DELETE"])
def delete_skill(skill_id):
    """Delete a skill by ID"""
    # Check if skill exists
    if skill := get_skill(skill_id=skill_id):
        # Remove the skill from any parent skills lists that reference it as a parent
        if skill.children:
            remove_as_parent_skill(skill)
            
        # Delete the skill
        db.session.delete(skill)
        db.session.commit()
        return jsonify({"message": "Skill deleted successfully"}), 200
    # If skill does not exist, return an error
    return jsonify({"error": "Skill not found"}), 404


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


@skills_bp.route("/<int:skill_id>/parents", methods=["DELETE"])
def remove_parent_skill(skill_id):
    """Remove a parent skill from a skill by IDs"""

    # Validate if child skill exists
    if not (child := get_skill(skill_id=skill_id)):
        return jsonify({"error": "Child skill not found"}), 404

    # Validate the parent ID
    parent_id = request.json.get("parent_id")
    try:
        parent_id = int(parent_id)
        if parent_id <= 0:
            raise ValueError
    except ValueError:
        return jsonify({"error": "Invalid parent ID"}), 400
    parent = get_skill(skill_id=parent_id)
    # Check if the parent skill is in parents list
    if parent not in child.parents:
        return jsonify({"error": "Parent skill not in parents list."}), 400

    # Remove the parent skill from the child skill
    child.parents.remove(parent)
    db.session.commit()
    return jsonify({"message": "Parent skill removed from successfully"}), 200


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

def remove_as_parent_skill(parent_skill):
    # Check if skill has children
    if parent_skill.children:
        for child in parent_skill.children:
            # Remove the parent from the child's parents list
            child.parents.remove(parent_skill)

        # Commit the changes to the database
        db.session.commit()
        return jsonify(
            {"message": "Parent skill removed from child skills successfully"}
        ), 200
    # If no children, return an error
    return jsonify(
        {"error": "Skill has no children to remove"}
    ), 400