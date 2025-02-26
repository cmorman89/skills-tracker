"""Creates the database and tables based on models.py."""

from app.models import db, Skill
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///skills.db"


def setup_database():
    """Creates the database and tables based on models.py."""
    engine = create_engine(DATABASE_URL)
    db.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    root_skill = Skill(id=1, name="all skills", description="Root skill",)
    session.add(root_skill)
    session.commit()
    print("Database setup complete.")


if __name__ == "__main__":
    setup_database()
