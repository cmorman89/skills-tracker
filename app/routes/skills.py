from flask import Blueprint, request, jsonify, Response
from ..models import db, Skill

# Define the blueprint for skills
skills_bp = Blueprint("skills", __name__)


@skills_bp.route("/", methods=["GET"])
def list_all_skills():
    """List all skills."""
    return jsonify([skill.to_json_with_relationships() for skill in get_skill()])


@skills_bp.route("/<int:skill_id>", methods=["GET"])
def list_skill_by_id(skill_id):
    """Get a skill by ID."""
    skill = get_skill(skill_id=skill_id)
    return jsonify(skill.to_json_with_relationships())


@skills_bp.route("/", methods=["POST"])
def create_skill():
    """Create a new skill."""

    # Check if data is provided
    if not (data := request.json):
        return jsonify({"error": "No data provided"}), 400

    # Validate the skill name
    if name := data.get("name"):
        if not isinstance(name, str):
            return jsonify({"error": "Skill name must be a string"}), 400
        if not (name := name.strip().lower()):
            return jsonify({"error": "Skill name cannot be empty"}), 400
    else:
        return jsonify({"error": "Skill name is required"}), 400

    # Check for duplicate skill name
    if get_skill(skill_name=name):
        return jsonify({"error": "Skill name already exists"}), 400

    # Check if description is provided
    if description := data.get("description"):
        if isinstance(description, str):
            description = description.strip()
            if description == "":
                description = None
        else:
            description = None

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
    if not (skill := get_skill(skill_id=skill_id)):
        return jsonify({"error": "Skill not found"}), 404

    # Get the data from the request
    if not (data := request.json):
        return jsonify({"error": "No data provided"}), 400

    # Validate the skill name
    name = data.get("name")
    if name or name == "":
        if not isinstance(name, str):
            name = skill.name
        if not (name := name.strip().lower()):
            return jsonify({"error": "Skill name cannot be empty"}), 400
    else:
        name = skill.name

    # Check for duplicate skill name
    if name != skill.name and get_skill(skill_name=name):
        return jsonify({"error": "Skill name already exists"}), 400

    # Check if description is provided
    if description := data.get("description"):
        if isinstance(description, str):
            description = description.strip()
            if description == "":
                description = None
        else:
            description = skill.description

    # Update the skill in the database
    skill.name = name
    skill.description = description
    db.session.commit()

    # Return the updated skill
    return jsonify(skill.to_json()), 200


@skills_bp.route("/<int:skill_id>", methods=["DELETE"])
def delete_skill(skill_id):
    """Delete a skill by ID"""
    # Check if skill exists
    if skill := get_skill(skill_id=skill_id):
        # Remove the skill from any parent skills lists that reference it as a parent
        if skill.children:
            remove_skill_from_all_children(skill)

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


@skills_bp.route("/<int:skill_id>/children", methods=["POST"])
def add_child_skill(skill_id):
    """Add a child skill to a skill by ID"""

    # Validate if parent skill exists
    if not (parent := get_skill(skill_id=skill_id)):
        return jsonify({"error": "Parent skill not found"}), 404

    # Validate the child skill ID
    child_id = request.json.get("child_id")
    try:
        child_id = int(child_id)
        if child_id <= 0:
            raise ValueError
    except ValueError:
        return jsonify({"error": "Invalid child ID"}), 400

    # Check if the child skill exists
    if not (child := get_skill(skill_id=child_id)):
        return jsonify({"error": "Child skill not found"}), 404

    # Check if the child skill is already a child of the parent skill
    if child in parent.children:
        return jsonify({"error": "Child skill already exists in list"}), 400

    # Add the child skill to the parent skill
    parent.children.append(child)
    db.session.commit()
    return jsonify({"message": "Child skill added to list successfully"}), 200


@skills_bp.route("/<int:skill_id>/children", methods=["DELETE"])
def remove_child_skill(skill_id):
    """Remove a child skill from a skill by IDs"""
    # Validate if parent skill exists
    if not (parent := get_skill(skill_id=skill_id)):
        return jsonify({"error": "Parent skill not found"}), 404

    # Validate the child ID
    child_id = request.json.get("child_id")
    try:
        child_id = int(child_id)
        if child_id <= 0:
            raise ValueError
    except ValueError:
        return jsonify({"error": "Invalid child ID"}), 400
    child = get_skill(skill_id=child_id)

    # Check if the child skill is in children list
    if child not in parent.children:
        return jsonify({"error": "Child skill not in children list."}), 400

    # Remove the child skill from the parent skill
    parent.children.remove(child)
    db.session.commit()
    return jsonify({"message": "Child skill removed from successfully"}), 200


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


def remove_skill_from_all_children(parent_skill):
    """Remove a skill from all its children to prevent stale references."""
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
    return jsonify({"error": "Skill has no children to remove"}), 400


@skills_bp.route("/<int:skill_id>/tree", methods=["GET"])
def view_as_tree(skill_id):
    """Recursively view a skill and its children as a text-based tree."""
    # Check if skill exists
    if not (skill := get_skill(skill_id=skill_id)):
        return jsonify({"error": "Skill not found"}), 404
    # Build the tree structure
    return Response(recurse_tree(skill), mimetype="text/plain"), 200


def recurse_tree(skill, indent=0, tree=""):
    """Helper function to recursively build the skill tree."""
    # Add the skill to the tree
    tree += " " * indent + f"- {skill.name} ({skill.description})\n"
    # Increase the indent for children
    indent += 2
    # Get all children skills
    if children := skill.children:
        # Recursively call the function for each child
        for child in children:
            tree = recurse_tree(child, indent, tree)
    return tree
