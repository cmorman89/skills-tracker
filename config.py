"""
Flask configuration module.
"""

import os


class Config:
    SESSION_PERMANENT = False
    SESSION_TYPE = "filesystem"
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(os.path.abspath(os.path.dirname(__file__)), 'skills.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
