"""Creates the database and tables based on models.py."""

import sys

from app.models import db, Skill, SourceType
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///skills.db"


def setup_database():
    """Creates the database and tables based on models.py."""

    # Connect to the database
    print("Setting up the database...")
    engine = create_engine(DATABASE_URL)
    db.metadata.bind = engine
    # Create a session to interact with the database
    print("Creating session...")
    Session = sessionmaker(bind=engine)
    session = Session()
    print("Session created.")

    # Check if the --rebuild flag is provided
    if len(sys.argv) == 2 and sys.argv[1] == "--rebuild":
        # If --rebuild is provided, drop the existing database and recreate it
        print("Rebuild flag detected.")
        print("Deleting the database...")
        db.drop_all()

    # Create the tables
    print("Creating tables...")
    db.metadata.create_all(engine)
    print("Tables created.")

    # Complete setup tasks
    add_root_skill(session)
    add_source_types(session)

    # Close the session and complete setup
    session.close()
    print("Database setup complete.")


def add_root_skill(session):
    """Adds the root skill to the database."""
    print("Adding root skill...")
    try:
        root_skill = Skill(
            id=1,
            name="all skills",
            description="Root skill",
        )
        session.add(root_skill)
        session.commit()
        print("Root skill added.")
    except Exception as e:
        print(f"Error adding root skill: {e}")
        session.rollback()
        print("Rolling back changes.")


def add_source_types(session):
    """Adds source types to the database."""
    print("Adding skill types...")
    try:
        skill_types = [
            SourceType(
                name="Work",
                description="Any professional source such as a job or internship.",
            ),
            SourceType(
                name="Education",
                description="Any traditional education source such as a school or university.",
            ),
            SourceType(
                name="Certification",
                description="Any professional certification or course.",
            ),
            SourceType(
                name="Project",
                description="Personal, professional, academic, or other projects.",
            ),
            SourceType(
                name="Personal",
                description="Any personal source such as a hobby or interest.",
            ),
            SourceType(
                name="Other",
                description="Any other source not covered by the above categories.",
            ),
        ]
        session.add_all(skill_types)
        session.commit()
        print("Skill types added.")
    except Exception as e:
        print(f"Error adding skill types: {e}")
        session.rollback()
        print("Rolling back changes.")


if __name__ == "__main__":
    setup_database()
