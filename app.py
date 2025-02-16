import sqlite3
from flask import Flask, flash, g, render_template, request

app = Flask(__name__)
DATABASE = "./db/skills.db"

def get_db():
    if not hasattr(g, "sqlite_db"):
        g.sqlite_db = sqlite3.connect(DATABASE)
    return g.sqlite_db

@app.teardown_appcontext
def close_connection(exception):
    if hasattr(g, "sqlite_db"):
        g.sqlite_db.close()


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
def index():
    return render_template("base.html")

@app.route("/skill/add")
def add_user_task():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO skills (name) VALUES ('test')")
    db.commit()
    return render_template("add_skill.html")

# def add_skill(skill: str):
    