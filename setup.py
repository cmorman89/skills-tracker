"""Creates the database and tables based on models.py."""

import sys

from app.models import Category, db, Skill, SourceType
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
    add_skill_categories(session)

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

def add_skill_categories(session):
    """Adds skill categories to the database."""
    print("Adding skill categories...")
    try:
        skill_categories = [
            Category(
                name="Software Development",
                description="Programming languages, application development, and coding best practices.",
                icon="faCode",
            ),
            Category(
                name="Data Analysis & Machine Learning",
                description="Statistical analysis, data mining, machine learning techniques, and algorithm development.",
                icon="faMagnifyingGlassChart",
            ),
            Category(
                name="Graphic & Visual Design",
                description="Digital illustration, photo editing, and layout design for print and digital media.",
                icon="faPenFancy",
            ),
            Category(
                name="Communication & Writing",
                description="Professional writing, content creation, copywriting, and public speaking skills.",
                icon="faComments",
            ),
            Category(
                name="Leadership & Team Management",
                description="Managing teams, project oversight, strategic planning, and effective delegation.",
                icon="faUserTie",
            ),
            Category(
                name="Marketing & Advertising",
                description="Market research, digital marketing strategies, branding, and advertising campaigns.",
                icon="faRectangleAd",
            ),
            Category(
                name="Financial & Accounting Skills",
                description="Budgeting, financial analysis, bookkeeping, and investment planning.",
                icon="faCoins",
            ),
            Category(
                name="Customer Support & Relations",
                description="Client interaction, technical support, conflict resolution, and customer service excellence.",
                icon="faHeadset",
            ),
            Category(
                name="Administrative & Office Management",
                description="Scheduling, organizational tasks, record keeping, and workflow management.",
                icon="faPersonChalkboard",
            ),
            Category(
                name="Human Resources & Talent Management",
                description="Recruitment, employee relations, performance management, and HR policy implementation.",
                icon="faPeopleGroup",
            ),
            Category(
                name="Legal & Regulatory Compliance",
                description="Legal research, contract law, regulatory standards, and risk mitigation.",
                icon="faScaleBalanced",
            ),
            Category(
                name="Teaching & Training",
                description="Instructional design, curriculum development, tutoring, and educational methodologies.",
                icon="faChalkboardUser",
            ),
            Category(
                name="Scientific Research & Innovation",
                description="Research methodology, experimental design, innovation processes, and academic inquiry.",
                icon="faFlaskVial",
            ),
            Category(
                name="Engineering & Technical Trades",
                description="Mechanical, electrical, and civil engineering, along with hands-on technical trades.",
                icon="faRulerCombined",
            ),
            Category(
                name="Craftsmanship & Artisan Skills",
                description="Traditional and bespoke crafts like woodworking, metalworking, ceramics, and artisanal techniques.",
                icon="faHammer",
            ),
            Category(
                name="Physical Fitness & Wellness",
                description="Personal training, nutrition, mental health practices, and wellness coaching.",
                icon="faDumbbell",
            ),
            Category(
                name="Interpersonal & Social Skills",
                description="Empathy, active listening, negotiation, and relationship building in social and professional settings.",
                icon="faPeopleArrows",
            ),
            Category(
                name="Critical Thinking & Problem Solving",
                description="Logical reasoning, analytical thinking, troubleshooting, and decision-making processes.",
                icon="faBrain",
            ),
            Category(
                name="Entrepreneurship & Business Strategy",
                description="Startup development, business planning, market analysis, and strategic growth initiatives.",
                icon="faLightBulb",
            ),
        ]
        session.add_all(skill_categories)
        session.commit()
        print("Skill categories added.")
    except Exception as e:
        print(f"Error adding skill categories: {e}")
        session.rollback()
        print("Rolling back changes.")


if __name__ == "__main__":
    setup_database()
