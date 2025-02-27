from flask import Blueprint, Response, jsonify, request, render_template

from app.models import SourceType
from ..models import Source, db

# Define the blueprint for sources
sources_bp = Blueprint("sources", __name__, url_prefix="/api/v1/sources")


# FETCHING SOURCES
@sources_bp.route("/", methods=["GET"])
def list_all_sources():
    """List all sources."""
    sources = Source.query.all()
    return jsonify([source.to_json() for source in sources])


@sources_bp.route("/extended", methods=["GET"])
def list_all_sourcesP_with_relationshios():
    """List all sources."""
    sources = Source.query.all()
    return jsonify([source.to_json_with_relationships() for source in sources])


@sources_bp.route("/<int:source_id>", methods=["GET"])
def get_source(source_id):
    """Get a source by ID."""
    source = Source.query.get_or_404(source_id)
    return jsonify(source.to_json())


@sources_bp.route("/name/<string:source_name>", methods=["GET"])
def get_source_by_name(source_name):
    """Get a source by name."""
    source_name = source_name.strip().lower()
    source = Source.query.filter_by(name=source_name).first()
    if not source:
        return jsonify()
    return jsonify(source.to_json())


@sources_bp.route("/types", methods=["GET"])
def list_source_types():
    """List all source types."""
    source_types = SourceType.query.all()
    return jsonify([source_type.to_json() for source_type in source_types])


# CREATING SOURCES
@sources_bp.route("/", methods=["POST"])
def create_source():
    """Create a new source."""
    data = request.get_json()
    if not data:
        return Response("Invalid input", status=400)

    new_source = Source(
        name=data.get("name").strip().lower(),
        description=data.get("description"),
        type_id=data.get("type"),
    )
    try:
        db.session.add(new_source)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

    return jsonify(new_source.to_json()), 201
